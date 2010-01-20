[
{if $order_list}
	{foreach $order_list as $child}
	{ldelim} "link" : "{concat("/shop/orderview/",$child.id,"/")|ezurl(no)}",  "title" : "{$child.total_ex_vat|l10n(currency)}" , "description" : "{$child.created|l10n(shortdatetime)}" {rdelim}{delimiter},{/delimiter}
	{/foreach}
{else}
	{ldelim} "link" : false, "title" : "The order list is empty." {rdelim}	
{/if}
,{ldelim} "link" : "{'/shop/orderlist/'|ezurl(no)}", "title" : "{'Orders'|i18n( 'design/admin/parts/shop/menu' )}" {rdelim}	
]