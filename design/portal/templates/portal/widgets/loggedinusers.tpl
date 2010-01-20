{def	$list_items	= fetch( 'user', 'logged_in_users', hash( 'limit' ,10) )}

[
{foreach $list_items as $child}
{ldelim} "link" : "{$child.contentobject.main_node.url_alias|ezurl(no)}",  "title" : "{$child.contentobject.name|wash()|shorten(100)}",  "description" : "{"last login:"|i18n('extension/contactivity/portal')} {$child.last_visit|l10n(shortdatetime)}"  {rdelim}{delimiter},{/delimiter}
{/foreach}
]