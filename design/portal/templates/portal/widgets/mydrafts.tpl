{def $list_items=fetch('content','draft_version_list',hash(limit,$page_limit,offset,$view_parameters.offset))}
[
{if $list_items}
	{foreach $list_items as $child}
	{ldelim} "link" : "{concat("/content/versionview/",$child.contentobject.id,"/",$Draft:item.version,"/")|ezurl(no)}",  "title" : "{$child.version_name|wash()|shorten(100)}"  {rdelim}{delimiter},{/delimiter}
	{/foreach}
{else}
	{ldelim} "link" : "", "title" : "{'There are no drafts that belong to you.'|i18n( 'design/admin/content/draft' )}" {rdelim}	
{/if}
,{ldelim} "link" : "{'/content/draft/'|ezurl(no)}", "title" : "{'My drafts'|i18n( 'design/admin/parts/my/menu' )}" {rdelim}	
]