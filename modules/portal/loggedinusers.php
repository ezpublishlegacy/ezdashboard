<?php
// SOFTWARE NAME: Portal extension
// SOFTWARE RELEASE: 1.0-0
// COPYRIGHT NOTICE: Copyright (C) 2009-2010 Contactivity
// SOFTWARE LICENSE: GNU General Public License v2.0
// NOTICE: >

//   This program is free software; you can redistribute it and/or
//   modify it under the terms of version 2.0  of the GNU General
//   Public License as published by the Free Software Foundation.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of version 2.0 of the GNU General
//   Public License along with this program; if not, write to the Free
//   Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//   MA 02110-1301, USA.
//
//


include_once( 'autoload.php' );
include_once( 'kernel/common/template.php' );

$http = eZHTTPTool::instance();
$user =  eZUser::currentUser();
$tpl = templateInit();
$Result = array();
$Result['content'] = $tpl->fetch( 'design:portal/widgets/loggedinusers.tpl' );
$Result['path'] = array();
$Result['pagelayout'] = false;


?>