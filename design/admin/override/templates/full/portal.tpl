{* Window controls. *}
<div class="menu-block">
<ul>
    {* Portal. *}
    {section show=ezpreference( 'admin_navigation_portal' )}
    <li class="enabled {$li_width}">
    <div class="button-bc"><div class="button-tl"><div class="button-tr"><div class="button-br">
        <a href={'/user/preferences/set/admin_navigation_portal/0'|ezurl} title="{'Switch to standard view.'|i18n( 'extension/contactivity/portal' )}">{'Switch to standard view'|i18n( 'extension/contactivity/portal' )}</a>
    </div></div></div></div>
    </li>
    {section-else}
    <li class="disabled {$li_width}">
    <div class="button-bc"><div class="button-tl"><div class="button-tr"><div class="button-br">
        <a href={'/user/preferences/set/admin_navigation_portal/1'|ezurl} title="{'Switch to portal view.'|i18n( 'extension/contactivity/portal' )}">{'Switch to portal view'|i18n( 'extension/contactivity/portal' )}</a>
    </div></div></div></div>
    </li>
    {/section}
</ul>

<div class="break"></div>
</div>

{if ezpreference( 'admin_navigation_portal'  )}
	<script type="text/javascript">
	    var feeds = {ldelim}
		'latestcontent': {ldelim}
		    id: 'latestcontent',
		    title: '{"New Content"|i18n('extension/contactivity/portal')}',
		    url: 'portal/latestcontent',
		    list: true
		{rdelim},
		'latestupdates': {ldelim}
		    id: 'latestupdates',
		    title: '{"Latest Updates"|i18n('extension/contactivity/portal')}',
		    url: 'portal/latestupdates',
		    list: true
		{rdelim},
		'drafts': {ldelim}
		    id: 'drafts',
		    title: '{"My Drafts"|i18n('extension/contactivity/portal')}',
		    url: 'portal/mydrafts',
		    list: true
		{rdelim},
		'collaboration': {ldelim}
		    id: 'collaboration',
		    title: '{"Collaboration"|i18n('extension/contactivity/portal')}',
		    url: 'portal/collaboration',
		    list: true
		{rdelim},
		'collected': {ldelim}
		    id: 'collected',
		    title: '{"Collected Info"|i18n('extension/contactivity/portal')}',
		    url: 'portal/collectedinfo',
		    list: true
		{rdelim},
		'latestusers': {ldelim}
		    id: 'latestusers',
		    title: '{"Latest users"|i18n('extension/contactivity/portal')}',
		    url: 'portal/latestusers',
		   list: true
		{rdelim},
		'loggedin': {ldelim}
		    id: 'loggedin',
		    title: '{"Logged-in Users"|i18n('extension/contactivity/portal')}',
		    url: 'portal/loggedinusers',
		    list: true
		{rdelim},
		'mybookmarks': {ldelim}
		    id: 'mybookmarks',
		    title: '{"My Bookmarks"|i18n('extension/contactivity/portal')}',
		    url: 'portal/mybookmarks',
		    list: false
		{rdelim},
		'orders': {ldelim}
		    id: 'orders',
		    title: '{"Latest Orders"|i18n('extension/contactivity/portal')}',
		    url: 'portal/latestorders',
		    list: true
		{rdelim} {* ,
		'yourwidget': {ldelim}
		    id: 'yourwidget',
		    title: '{"Latest Orders"|i18n('extension/contactivity/portal')}',
		    url: 'portal/yourwidget',
		    list: false		
		*}
	   {rdelim};
	   var base ="http://{ezini('SiteSettings','SiteURL')}{"/"|ezurl(no)}/";
	</script>
	<script type="text/javascript" src={"javascript/yui/build/yui/yui-min.js"|ezdesign()}></script>
	<link rel="stylesheet" type="text/css" href={"stylesheets/portal.css"|ezdesign()}>
	<link rel="stylesheet" type="text/css" href={"stylesheets/reset-fonts-grids.css"|ezdesign()}>
	<div id="doc3" class="yui-t2">
	    <div id="bd">
		<div id="yui-main">
			<div class="yui-b">
			<div class="yui-g">
			    <div id="play">
				<ul class="list" id="list1"></ul>
				<ul class="list" id="list2"></ul>
				<ul class="list" id="list3"></ul>
			    </div>
			    </div>
		    </div>
		    </div>

	    </div>
	</div>
	<script>
	var assetsDir = {"javascript/"|ezdesign()};
	var buildDir = {"javascript/yui/build"|ezdesign()}+"/";
	var yuiConfig = {ldelim}combine: true, timeout: 10000{rdelim};
	</script>
	<script src={"javascript/portal.js"|ezdesign()}></script>
{else}
	 {include uri='design:details.tpl'}
	 {include uri='design:translations.tpl'}
	 {include uri='design:locations.tpl'}
	 {include uri='design:relations.tpl'}
	 {include uri='design:states.tpl'}
	 {include uri='design:children.tpl'}
{/if}