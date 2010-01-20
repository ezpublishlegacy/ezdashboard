//Use loader to grab the modules needed
YUI(yuiConfig).use('dd', 'anim', 'io', 'cookie', 'json', function(Y) {
    //Make this an Event Target so we can bubble to it
    var Portal = function() {
        Portal.superclass.constructor.apply(this, arguments);
    };
    Portal.NAME = 'portal';
    Y.extend(Portal, Y.Base);
    //This is our new bubble target..
    Y.Portal = new Portal();


    //Setup some private variables..
    var goingUp = false, lastY = 0, trans = {};
    
    //Setup the config for IO to use flash
	Y.io.transport({
		id: 'flash',
		yid: Y.id,
		src: buildDir + 'io/io.swf?stamp=' + (new Date()).getTime()
    });
    
    //Simple method for stopping event propagation
    //Using this so we can detach it later
    var stopper = function(e) {
        e.stopPropagation();
    };

    //Get the order, placement and minned state of the modules and save them to a cookie
    var _setCookies = function() {
        var dds = Y.DD.DDM._drags;
        var list = {};
        //Walk all the drag elements
        Y.each(dds, function(v, k) {
            var par = v.get('node').get('parentNode');
            //Find all the lists with drag items in them
            if (par.test('ul.list')) {
                if (!list[par.get('id')]) {
                    list[par.get('id')] = [];
                }
            }
        });
        //Walk the list
        Y.each(list, function(v, k) {
            //Get all the li's in the list
            var lis = Y.all('#' + k + ' li.item');
            lis.each(function(v2, k2) {
                //Get the drag instance for the list item
                var dd = Y.DD.DDM.getDrag('#' + v2.get('id'));
                //Get the mod node
                var mod = dd.get('node').query('div.mod');
                //Is it minimized
                var min = (mod.hasClass('minned')) ? true : false;
                //Setup the cookie data
                list[k][list[k].length] = { id: dd.get('data').id, min: min };
            });
        });
        //JSON encode the cookie data
        var cookie = Y.JSON.stringify(list);
        //Set the sub-cookie
        Y.Cookie.setSub('yui', 'portal', cookie);
    };

    //Helper method for creating the feed DD on the left
    var _createFeedDD = function(node, data) {
        //Create the DD instance
        var dd = new Y.DD.Drag({
            node: node,
            data: data,
            bubbles: Y.Portal
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false,
            borderStyle: 'none'
        });
        //Setup some stopper events
        dd.on('drag:start', _handleStart);
        dd.on('drag:end', stopper);
        dd.on('drag:drophit', stopper);
    };

    //Handle the node:click event
    /* {{{ */
    var _nodeClick = function(e) {
        //Is the target an href?
        if (e.target.test('a')) {
            var a = e.target, anim = null, div = a.get('parentNode').get('parentNode');
            //Did they click on the min button
            if (a.hasClass('min')) {
                //Get some node references
                var ul = div.query('ul'),
                    h2 = div.query('h2'),
                h = h2.get('offsetHeight'),
                hUL = ul.get('offsetHeight'),
                inner = div.query('div.inner');
                
                //Create an anim instance on this node.
                anim = new Y.Anim({
                    node: inner
                });
                //Is it expanded?
                if (!div.hasClass('minned')) {
                    //Set the vars for collapsing it
                    anim.setAttrs({
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut,
                        iteration: 1
                    });
                    //On the end, toggle the minned class
                    //Then set the cookies for state
                    anim.on('end', function() {
                        div.toggleClass('minned');
                        _setCookies();
                    });
                } else {
                    //Set the vars for expanding it
                    anim.setAttrs({
                        to: {
                            height: (hUL)
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut,
                        iteration: 1
                    });
                    //Toggle the minned class
                    //Then set the cookies for state
                    div.toggleClass('minned');
                    _setCookies();
                }
                //Run the animation
                anim.run();

            }
            //Was close clicked?
            if (a.hasClass('close')) {
                //Get some Node references..
                var li = div.get('parentNode'),
                    id = li.get('id'),
                    dd = Y.DD.DDM.getDrag('#' + id),
                    data = dd.get('data'),
                    item = Y.Node.get('#' + data.id);

                //Destroy the DD instance.
                dd.destroy();
                //Setup the animation for making it disappear
                anim = new Y.Anim({
                    node: div,
                    to: {
                        opacity: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });
                anim.on('end', function() {
                    //On end of the first anim, setup another to make it collapse
                    var anim = new Y.Anim({
                        node: div,
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    anim.on('end', function() {
                        //Remove it from the document
                        li.get('parentNode').removeChild(li);
                        item.removeClass('disabled');
                        //Setup a drag instance on the feed list
                        _createFeedDD(item, data);
                        _setCookies();

                    });
                    //Run the animation
                    anim.run();
                });
                //Run the animation
                anim.run();
            }
            //Stop the click
            e.halt();
        }
    };
    /* }}} */
    
    //This creates the module, either from a drag event or from the cookie load
    var setupModDD = function(mod, data, dd) {
        var node = mod;
        //Listen for the click so we can react to the buttons
        node.query('h2').on('click', _nodeClick);
        
        //Remove the event's on the original drag instance
        dd.detachAll('drag:start');
        dd.detachAll('drag:end');
        dd.detachAll('drag:drophit');
        
        //It's a target
        dd.set('target', true);
        //Setup the handles
        dd.addHandle('h2').addInvalid('a');
        //Remove the mouse listeners on this node
        dd._unprep();
        //Update a new node
        dd.set('node', mod);
        //Reset the mouse handlers
        dd._prep();

        //The Yahoo! Pipes URL
        var url = base + data.url;
        var listtype = data.list;
        //Start the XDR request
        var id = Y.io(url, {
            method: 'GET',
            xdr: { 
			    use:'flash'
		    },
            //XDR Listeners
		    on: { 
			    success: function(id, data) {
                    //On success get the feed data
                     if (listtype){
                    var d = feeds[trans[id]],
                    //Node reference
                    inner = d.mod.query('div.inner'),
                   
                    //Parse the JSON data
                    oRSS = Y.JSON.parse(data.responseText),
                    html = '';
                    
                    //Did we get data?
		       if (oRSS ) {
                        //Walk the list and create the news list
                        for (i=0, l=oRSS.length; i < l; ++i) {
                           html += '<li><a href="' + oRSS[i].link + '">' + oRSS[i].title + '</a>';
                           if (oRSS[i].description)
                           {
                           html +='<div class="small">'+oRSS[i].description+'</div>';
                           }
                        }
                     
		            }
		     }else{
		         var d = feeds[trans[id]];
		          inner = d.mod.query('div.inner');
		     	html=data.responseText;
		     }
                    //Set the innerHTML of the module
                    inner.set('innerHTML', '<ul>' + html + '</ul>');
                    if (Y.DD.DDM.activeDrag) {
                        //If we are still dragging, update the proxy element too..
                        var proxy_inner = Y.DD.DDM.activeDrag.get('dragNode').query('div.inner');
                        proxy_inner.set('innerHTML', '<ul>' + html + '</ul>');
                        
                    }
                },
			    failure: function(id, data) {
                    //Something failed..
                    alert('Feed failed to load..' + id + ' :: ' + data);
                }
		    }
        });
        //Keep track of the transaction
        feeds[data.id].trans = id;
        feeds[data.id].mod = mod;
        trans[id.id] = data.id;
    };
    

    //Helper method to create the markup for the module..
    var createMod = function(feed) {
        var str = '<li class="item">' +
                    '<div class="mod">' + 
                        '<h2><strong>' + feed.title + '</strong> <a title="minimize module" class="min" href="#"> </a>' +
                        '<a title="close module" class="close" href="#"></a></h2>' +
                        '<div class="inner">' +
                        '    <div class="loading">Feed loading, please wait..</div>' + 
                        '</div>' +
                    '</div>' +
                '</li>';
        return Y.Node.create(str);
    };
    
    //Handle the start Drag event on the left side
    var _handleStart = function(e) {
        //Stop the event
        stopper(e);
        //Some private vars
        var drag = this,
            list3 = Y.Node.get('#list1'),
            mod = createMod(drag.get('data'));
        
        //Add it to the first list
        list3.appendChild(mod);
        //Set the item on the left column disabled.
        drag.get('node').addClass('disabled');
        //Set the node on the instance
        drag.set('node', mod);
        //Add some styles to the proxy node.
        drag.get('dragNode').setStyles({
            opacity: '.5',
            borderStyle: 'none',
            width: '320px',
            height: '61px'
        });
        //Update the innerHTML of the proxy with the innerHTML of the module
        drag.get('dragNode').set('innerHTML', drag.get('node').get('innerHTML'));
        //set the inner module to hidden
        drag.get('node').query('div.mod').setStyle('visibility', 'hidden');
        //add a class for styling
        drag.get('node').addClass('moving');
        //Setup the DD instance
        setupModDD(mod, drag.get('data'), drag);

        //Remove the listener
        this.detach('drag:start', _handleStart);
    };
    
    //Walk through the feeds list and create the list on the left
    var feedList = Y.Node.get('#feeds ul');
    Y.each(feeds, function(v, k) {
        var li = Y.Node.create('<li id="' + k + '">' + v.title + '</li>');
        feedList.appendChild(li);
        //Create the DD instance for this item
        _createFeedDD(li, v);
    });

    //This does the calculations for when and where to move a module
    var _moveMod = function(drag, drop) {
        if (drag.get('node').hasClass('item')) {
            var dragNode = drag.get('node'),
                dropNode = drop.get('node'),
                append = false,
                padding = 30,
                xy = drag.mouseXY,
                region = drop.region,
                middle1 = region.top + ((region.bottom - region.top) / 2),
                middle2 = region.left + ((region.right - region.left) / 2),
                dir = false,
                dir1 = false,
                dir2 = false;
                
                //We could do something a little more fancy here, but we won't ;)
                if ((xy[1] < (region.top + padding))) {
                    dir1 = 'top';
                }
                if ((region.bottom - padding) < xy[1]) {
                    dir1 = 'bottom';
                }
                if ((region.right - padding) < xy[0]) {
                    dir2 = 'right';
                }
                if ((xy[0] < (region.left + padding))) {
                    dir2 = 'left';
                }
                dir = dir2;
                if (dir2 === false) {
                    dir = dir1;
                }
                switch (dir) {
                    case 'top':
                        var next = dropNode.get('nextSibling');
                        if (next) {
                            dropNode = next;
                        } else {
                            append = true;
                        }
                        break;
                    case 'bottom':
                        break;
                    case 'right':
                    case 'left':
                        break;
                }
            

            if ((dropNode !== null) && dir) {
                if (dropNode && dropNode.get('parentNode')) {
                    if (!append) {
                        dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                    } else {
                        dropNode.get('parentNode').appendChild(dragNode);
                    }
                }
            }
            //Resync all the targets because something moved..
            Y.Lang.later(50, Y, function() {
                Y.DD.DDM.syncActiveShims(true);
            });
        }
    };

    /*
    Handle the drop:enter event
    Now when we get a drop enter event, we check to see if the target is an LI, then we know it's out module.
    Here is where we move the module around in the DOM.    
    */
    Y.Portal.on('drop:enter', function(e) {
        if (!e.drag || !e.drop || (e.drop !== e.target)) {
            return false;
        }
        if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {
            if (e.drop.get('node').hasClass('item')) {
                _moveMod(e.drag, e.drop);
            }
        }
    });

    //Handle the drag:drag event
    //On drag we need to know if they are moved up or down so we can place the module in the proper DOM location.
    Y.Portal.on('drag:drag', function(e) {
        var y = e.target.mouseXY[1];
        if (y < lastY) {
            goingUp = true;
        } else {
            goingUp = false;
        }
        lastY = y;
    });

    /*
    Handle the drop:hit event
    Now that we have a drop on the target, we check to see if the drop was not on a LI.
    This means they dropped on the empty space of the UL.
    */
    Y.Portal.on('drag:drophit', function(e) {
        var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        if (drop.get('tagName').toLowerCase() !== 'li') {
            if (!drop.contains(drag)) {
                drop.appendChild(drag);
            }
        }
    });

    //Handle the drag:start event
    //Use some CSS here to make our dragging better looking.
    Y.Portal.on('drag:start', function(e) {
        var drag = e.target;
        if (drag.target) {
            drag.target.set('locked', true);
        }
        drag.get('dragNode').set('innerHTML', drag.get('node').get('innerHTML'));
        drag.get('dragNode').setStyle('opacity','.5');
        drag.get('node').query('div.mod').setStyle('visibility', 'hidden');
        drag.get('node').addClass('moving');
    });

    //Handle the drag:end event
    //Replace some of the styles we changed on start drag.
    Y.Portal.on('drag:end', function(e) {
        var drag = e.target;
        if (drag.target) {
            drag.target.set('locked', false);
        }
        drag.get('node').setStyle('visibility', '');
        drag.get('node').query('div.mod').setStyle('visibility', '');
        drag.get('node').removeClass('moving');
        drag.get('dragNode').set('innerHTML', '');
        _setCookies();
    });
    

    //Handle going over a UL, for empty lists
    Y.Portal.on('drop:over', function(e) {
        var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        if (drop.get('tagName').toLowerCase() !== 'li') {
            if (!drop.contains(drag)) {
                drop.appendChild(drag);
                Y.Lang.later(50, Y, function() {
                    Y.DD.DDM.syncActiveShims(true);
                });
            }
        }
    });

    //Create simple targets for the main lists..
    var uls = Y.all('#play ul.list');
    uls.each(function(v, k) {
        var tar = new Y.DD.Drop({
            node: v,
            padding: '20 0',
            bubbles: Y.Portal
        });
    });
    
    
    Y.on('io:xdrReady', function() {
        //Get the cookie data
        var cookie = Y.Cookie.getSub('yui', 'portal');
        if (cookie) {
            //JSON parse the stored data
            var obj = Y.JSON.parse(cookie);

            //Walk the data
            Y.each(obj, function(v, k) {
                //Get the node for the list
                var list = Y.Node.get('#' + k);
                //Walk the items in this list
                Y.each(v, function(v2, k2) {
                    //Get the drag for it
                    var drag = Y.DD.DDM.getDrag('#' + v2.id);
                    //Create the module
                    var mod = createMod(drag.get('data'));
                    if (v2.min) {
                        //If it's minned add some CSS
                        mod.query('div.mod').addClass('minned');
                        mod.query('div.inner').setStyle('height', '0px');
                    }
                    //Add it to the list
                    list.appendChild(mod);
                    //Set the drag listeners
                    drag.get('node').addClass('disabled');
                    drag.set('node', mod);
                    drag.set('dragNode', Y.DD.DDM._proxy);
                    drag.detachAll('drag:start');
                    drag.detachAll('drag:end');
                    drag.detachAll('drag:drophit');
                    drag._unprep();
                    //Setup the new Drag listeners
                    setupModDD(mod, drag.get('data'), drag);
                });
            });
        }
    });

});
