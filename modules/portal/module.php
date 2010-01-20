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

$Module = array( 'name' => 'Portal extension (c) 2010 by Contactivity bv' );

$ViewList = array();

$ViewList['latestcontent'] = array(
    'functions' => array( 'latestcontent' ),
    'script' => 'latestcontent.php',
    'params' => array( )
    );
    
$ViewList['latestupdates'] = array(
    'functions' => array( 'latestupdates' ),
    'script' => 'latestupdates.php',
    'params' => array( )
    );
    
$ViewList['mydrafts'] = array(
    'functions' => array( 'mydrafts' ),
    'script' => 'mydrafts.php',
    'params' => array( )
    );
    
$ViewList['latestorders'] = array(
    'functions' => array( 'latestorders' ),
    'script' => 'latestorders.php',
    'params' => array( )
    );

$ViewList['collaboration'] = array(
    'functions' => array( 'collaboration' ),
    'script' => 'collaboration.php',
    'params' => array( )
    );
$ViewList['latestusers'] = array(
    'functions' => array( 'latestusers' ),
    'script' => 'latestusers.php',
    'params' => array( )
    );

$ViewList['loggedinusers'] = array(
    'functions' => array( 'loggedinusers' ),
    'script' => 'loggedinusers.php',
    'params' => array( )
    );

$ViewList['collectedinfo'] = array(
    'functions' => array( 'collectedinfo' ),
    'script' => 'collectedinfo.php',
    'params' => array( )
    );

$ViewList['mybookmarks'] = array(
    'functions' => array( 'mybookmarks' ),
    'script' => 'mybookmarks.php',
    'params' => array( )
    );

$FunctionList = array();
$FunctionList['latestcontent'] = array( );
$FunctionList['latestupdates'] = array( );
$FunctionList['mydrafts'] = array( );
$FunctionList['latestorders'] = array( );
$FunctionList['collaboration'] = array( );
$FunctionList['latestusers'] = array( );
$FunctionList['loggedinusers'] = array( );
$FunctionList['collectedinfo'] = array( );
$FunctionList['mybookmarks'] = array( );
?>