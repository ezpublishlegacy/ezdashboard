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


class ezportalInfo
{
    static function info()
    {
        $eZCopyrightString = 'Copyright (C) 2009-' . date('Y') . ' Contactivity bv';

        return array( 'Name'      => 'Portal extension',
                      'Version'   => '1.0',
                      'Copyright' => $eZCopyrightString,
                      'License'   => 'GNU General Public License v2.0',
                      'Includes the following library'   => array( 'Name' => 'Yahoo YUI',
                                                                              'Version' => '3.0.0',
                                                                              'Copyright' => 'Yahoo! Inc., http://developer.yahoo.com/yui/license.html',
                                                                              'License' => 'Licensed under the BSD License') );
    }
}

?>
