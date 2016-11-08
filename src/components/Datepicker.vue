<style>
.tc-calendar-JSnext {
float: right;
left: -24px;
position: relative;
top: 8px;
z-index: 2;
}
.tc-calendar-JSprev {
float: left;
left: 24px;
position: relative;
top: 8px;
z-index: 2;
}

.tc-datepicker-wrapper{
background: #fff;
border: 1px solid #bbb;
padding: 3px;
position: fixed;
top: 50px;
border-radius: 2px;
font-family: Helvetica;
font-size: 15px;

-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none;   /* Chrome/Safari/Opera */
-khtml-user-select: none;    /* Konqueror */
-moz-user-select: none;      /* Firefox */
-ms-user-select: none;       /* Internet Explorer/Edge */
user-select: none;           /* Non-prefixed version, currently*/
text-align: center;
}
.tc-datepicker-innerwrapper {
overflow: hidden;
top: -27px;
position: relative;
display: inline-block;
}
.tc-calendar {
display : flex;
left:0;
position: relative;
}
.tc-month {
display: flex;
padding: 0 7px;
border-collapse: collapse;
border-spacing: 0;
}
.tc-month h4 {
margin: 3px;
padding-top: 5px;
}

.tc-disabled {
cursor: default !important;
opacity: 0.35;
}
.tc-calendar th div, .tc-calendar h4 {
font-weight: 700;
color: #444;
text-align: center;
}
.tc-day, .tc-calendar th div{
width: 34px;
height: 25px;
}
.tc-day {
margin:0;
font-weight: bold;
color: #0073ea;
padding: 0;
margin: 0;
text-align: center;
cursor: pointer;
}

.tc-calendar .tc-between-dates {
color: #fff;
background: #66abf2;
border-radius: 0;
}

.tc-different-month {
opacity: 0;
cursor: default;
}


.tc-select-single .tc-selected-outbound{
color: #fff;
background: #0073ea;
border-radius: 3px;
position: relative;
}

.tc-select-single .tc-day-canhover:hover {
color: #fff;
background: #2d94ff;
border-radius: 3px;
position: relative;
/*border-radius: 3px 0 0 3px;
background: #2d94ff;
z-index: 4;*/
}



.tc-calendar.tc-select-outbound .tc-day-canhover:hover {
color: #fff;
background: #2d94ff;
border-radius: 3px 0 0 3px;
position: relative;
/*border-radius: 3px 0 0 3px;
background: #2d94ff;
z-index: 4;*/
}


.tc-calendar.tc-select-outbound .tc-day-canhover:hover:after {
content: '';
position: absolute;
right: -6px;
top: 0px;
width: 0;
height: 0;
border-style: solid;
border-width: 13px 0 13px 6px;
border-color: transparent transparent transparent #2D94FF;
z-index: 4;
}


.tc-calendar.tc-select-outbound .tc-day-canhover:hover:after {
border-color: transparent transparent transparent #2d94ff;
}

.tc-select-outbound .tc-selected-outbound,
.tc-select-inbound .tc-selected-outbound {
position: relative;
color: #fff;
background: #0073ea;
border-radius: 3px 0 0 3px;
}

.tc-select-outbound .tc-selected-outbound:after,
.tc-select-inbound .tc-selected-outbound:after {
z-index: 4;
content: '';
position: absolute;
right: -6px;
top: 0;
width: 0;
height: 0;
border-style: solid;
border-width: 13px 0 13px 6px;
border-color: transparent transparent transparent #0073ea;
}








.tc-calendar.tc-select-inbound .tc-day-canhover:hover {
color: #fff;
background: #2d94ff;
border-radius: 0 3px 3px 0;
position: relative;
/*border-radius: 3px 0 0 3px;
background: #2d94ff;
z-index: 4;*/
}


.tc-calendar.tc-select-inbound .tc-day-canhover:hover:after {
content: '';
position: absolute;
left: -6px;
top: 0px;
width: 0;
height: 0;
border-style: solid;
border-width: 13px 6px 13px 0;
border-color: transparent #2D94FF transparent transparent;
z-index: 4;
}
.tc-selected-inbound:after {
z-index: 4;
content: '';
position: absolute;
left: -6px;
top: 0;
width: 0;
height: 0;
border-style: solid;
border-width: 13px 6px 13px 0;
border-color: transparent #0073ea transparent transparent;
}

.tc-calendar.tc-select-inbound .tc-day-canhover:hover:after {
border-color: transparent #2d94ff transparent transparent;
}

.tc-calendar .tc-selected-inbound {
position: relative;
color: #fff;
background: #0073ea;
border-radius: 0 3px 3px 0;
}
</style>
<template>
  <div>
    <input />
  </div>
</template>
<script>
/* global window */
/* global document */

export default {
  name: 'Datepicker',
};
</script>
