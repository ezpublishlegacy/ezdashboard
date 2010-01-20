{def $latest_item_list=fetch("collaboration","item_list",hash("limit",10,"offset",0,"is_active",true()))}
[
{if gt($latest_item_list|count,0)}
	{foreach $latest_item_list as $child}
		{def $objectversion=fetch( content, version,
		                          hash( object_id, $child.content.content_object_id,
		                                version_id, $child.content.content_object_version ) )}

		{ldelim} "link" : "{concat("collaboration/item/full/",$child.id)|ezurl(no)}",  "title" : "{$objectversion.version_name}", "description" : "{$child.created|l10n(shortdatetime)}"  {rdelim}{delimiter},{/delimiter}
	{/foreach}
{else}
	{ldelim} "link" : false, "title" : "{"No new items to be handled."|i18n('design/standard/collaboration')}" {rdelim}
{/if}
,{ldelim} "link" : "{'/collaboration/view/summary/'|ezurl(no)}", "title" : "{'Collaboration'|i18n( 'design/admin/parts/my/menu' )}" {rdelim}	
]