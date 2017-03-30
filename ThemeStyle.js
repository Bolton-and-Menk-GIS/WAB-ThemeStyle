define(['dojo/dom',
  'dojo/on',
  'dojo/query',
  'dojo/_base/lang',
  'dojo/dom-style',
  'dojo/NodeList-dom',
  'dojo/NodeList-traverse'
], function(dom, on, query, lang, domStyle){
  var mo = {};
  mo.eventMap = {}; // register event listeners to be added

  mo.matchThemeColor = function(templateElement, rootSelector, childSelectors, buttonSelector){
    /* matches colors of a specific template element
    *
    * Arguments:
    *  `templateElement` - css selector for the element that has the desired "background-color" css attribute (string)
    *  `rootSelector` - parent node for which to apply color scheme to children (string)
    *  `childSelectors` - array of css selectors for children to apply "background-color" css to [string, string, ...]
    *  `buttonSelector` - (optional) css selector for buttons/elements for which to apply a hover event. The hover event
    *                     creates animation to show the button with 70% opacity. (string)
    */
    var selectors = childSelectors.join(', ');
    var tempElmNode = query(templateElement)[0]
    if (tempElmNode){
      var bg_color = domStyle.getComputedStyle(tempElmNode).backgroundColor;
      var widgetSelector = query(rootSelector)[0].parentNode;

      // get list of all children matching child selectors and set color
      query(selectors, widgetSelector).style('background-color', bg_color)

      // set color for buttons on hover events
      if (buttonSelector){
        mo.removeEventListeners();

        // set color for hover to have 70% opacity
        var rgb_vals;
        if (bg_color.startsWith('rgb(')){
          rgb_vals = bg_color.split('(')[1].split(')')[0].split(',');
          rgb_vals.push('0.7');
        } else if (bg_color.startsWith('rgba(')){
          rgb_vals = bg_color.split('(')[1].split(')')[0].split(',');
          rgb_vals[3] = '0.7';
        }
        if (rgb_vals){
          var buttons = query(buttonSelector, widgetSelector);
          buttons.forEach(function(btn){
            var btnId = btn.getAttribute('id');
            if (btnId && !mo.eventMap.hasOwnProperty(btnId + '-mouseover')){
              var evt = on(btn, 'mouseover', function(e){
                domStyle.set(btn, 'background-color',  'rgba(' + rgb_vals.join(',') + ')');
              });
              mo.eventMap[btnId + '-mouseover'] = evt;
            }

            if (btnId && !mo.eventMap.hasOwnProperty(btnId + '-mouseout')){
              var evt = on(btn, 'mouseout', function(e){
                domStyle.set(btn, 'background-color', bg_color);
              });
              mo.eventMap[btnId + '-mouseout'] = evt;
            }
          });
        }
      }
    }
  }

  mo.removeEventListeners = function() {
    for (key in mo.eventMap){
      mo.eventMap[key].remove();
      delete mo.eventMap[key];
    }
  }

  return mo;
})
