{if and(eq($module_result.node_id,2),ezpreference( 'admin_navigation_portal'  ))}
	<div id="portal">

	<div class="box-header"><div class="box-tc"><div class="box-ml"><div class="box-mr">{section show=$first}<div class="box-tl"><div class="box-tr">{/section}

	{section show=ezpreference( 'admin_portal_menu' )}
	    {section show=and( ne( $ui_context, 'edit' ), ne( $ui_context, 'browse' ) )}
	     <h4><a class="showhide" href={'/user/preferences/set/admin_portal_menu/0'|ezurl} title="{'Hide widgets.'|i18n( 'design/extension/portal' )}"><span class="bracket">[</span>-<span class="bracket">]</span></a> {'Widgets'|i18n( 'design/extension/portal' )}</h4>
	    {section-else}
	     {section show=eq( $ui_context, 'edit' )}
	       <h4><span class="disabled openclose"><span class="bracket">[</span>-<span class="bracket">]</span></span> <span class="disabled">{'w'|i18n( 'design/extension/portal' )}</span></h4>
	     {section-else}
	       <h4><a class="showhide" href={'/user/preferences/set/admin_portal_menu/0'|ezurl} title="{'Hide widgets.'|i18n( 'design/extension/portal' )}"><span class="bracket">[</span>-<span class="bracket">]</span></a> {'Widgets'|i18n( 'design/extension/portal' )}</h4>
	     {/section}
	    {/section}

	</div></div></div></div>{section show=$first}</div></div>{/section}

	{section show=$last}
	<div class="box-bc"><div class="box-ml"><div class="box-mr"><div class="box-bl"><div class="box-br"><div class="box-content">
	{section-else}
	<div class="box-ml"><div class="box-mr"><div class="box-content">
	{/section}

	   <div id="feeds">
			<p>{'Drag a widget into one of the columns to the left.'|i18n( 'design/extension/portal' )}</p>

			<ul></ul>
		    </div>


	</div></div></div>{section show=$last}</div></div></div>{/section}

	{section-else}
	    {section show=and( ne( $ui_context,'edit' ), ne( $ui_context, 'browse' ) )}
	    <h4><a class="showhide" href={'/user/preferences/set/admin_portal_menu/1'|ezurl} title="{'Show widgets.'|i18n( 'design/extension/portal' )}"><span class="bracket">[</span>+<span class="bracket">]</span></a> {'Widgets'|i18n( 'design/extension/portal' )}</h4>
	    {section-else}
	    {section show=eq( $ui_context, 'edit' )}
	     <h4><span class="disabled openclose"><span class="bracket">[</span>+<span class="bracket">]</span></span> <span class="disabled">{'portal'|i18n( 'design/extension/portal' )}</span></h4>
	    {section-else}
	     <h4><a class="showhide" href={'/user/preferences/set/admin_portal_menu/1'|ezurl} title="{'Show widgets.'|i18n( 'design/extension/portal' )}"><span class="bracket">[</span>+<span class="bracket">]</span></a> {'Widgets'|i18n( 'design/extension/portal' )}</h4>
	    {/section}
	    {/section}

	</div></div></div></div>{section show=$first}</div></div>{/section}

	{section show=$last}
	<div class="box-bc"><div class="box-ml"><div class="box-mr"><div class="box-bl"><div class="box-br"><div class="box-content">
	</div></div></div></div></div></div>
	{/section}

	{/section}                       
	</div>
{/if}
