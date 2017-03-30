# WAB-ThemeStyle
Allows you to copy color scheme from Theme Style within a custom ArcGIS Web App Builder Application.

This module has two functions, one to match the theme/color of an element, and another to remove event listeners created by the first function (event listeners are just for hover events to show distinction in color).

To match the style of a theme, specify the following parameters:

```
/* matches colors of a specific template element
*
* Arguments:
*  `templateElement` - css selector for the element that has the desired "background-color" css attribute (string)
*  `rootSelector` - parent node for which to apply color scheme to children (string)
*  `childSelectors` - array of css selectors for children to apply "background-color" css to [string, string, ...]
*  `buttonSelector` - (optional) css selector for buttons/elements for which to apply a hover event. The hover event
*                     creates animation to show the button with 70% opacity. (string)
*/
```

The module can be loaded into a custom widget by placing the ThemeStyle.js file in the project folder and using the AMD loader like this:

```
define(['./ThemeStyle'], function(ThemeStyle){
  // do stuff with ThemeStyle here
})
```

To match the theme of a WAB theme, do the following:

```
ThemeStyle.matchThemeColor('div.jimu-widget-header-controller', 'div.rental-density', [
  ".jimu-panel-title",
  ".jimu-title",
  ".jimu-footer",
  ".jimu-widget-title",
  ".jimu-panel",
  ".jimu-btn"
], '.jimu-btn');

```

Click on thumbnail below to see video:


[![ScreenShot](https://raw.githubusercontent.com/CalebM1987/CalebM1987.github.io/master/images/themestyle.PNG)](https://youtu.be/5qsG9CT8Whc)
