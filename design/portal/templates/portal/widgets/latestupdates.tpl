{def	$list_items	= fetch( 'content', 'tree', hash( 'parent_node_id', 2,
							    'sort_by', array( array( 'modified', false() ) ),
							    'limit', 10 ) )}
[
{foreach $list_items as $child}
{ldelim} "link" : "{$child.url_alias|ezurl(no)}",  "title" : "{$child.name|wash()|shorten(100)}",  "description" : "{"modified:"|i18n('extension/contactivity/portal')} {$child.object.modified|l10n(shortdatetime)}" {rdelim}{delimiter},{/delimiter}
{/foreach}
]