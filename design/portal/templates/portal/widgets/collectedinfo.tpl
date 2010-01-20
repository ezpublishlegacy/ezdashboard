[
{if gt($collection_list|count,0)}
	{foreach $collection_list as $child}
		{foreach $child as $collection}
		{ldelim} "link" : "{concat("infocollector/view/",$collection.id)|ezurl(no)}",  "title" : "{$collection.object.name}", "description" : "{$collection.created|l10n(shortdatetime)}"  {rdelim}{delimiter},{/delimiter}
		{/foreach}
	{/foreach}
{else}
	{ldelim} "link" : false, "title" : "{"No new items to be handled."|i18n('design/standard/collaboration')}" {rdelim}
{/if}
,{ldelim} "link" : "{'/infocollector/overview/'|ezurl(no)}", "title" : "{'Collected information'|i18n( 'extension/contactivity/portal' )}" {rdelim}
]