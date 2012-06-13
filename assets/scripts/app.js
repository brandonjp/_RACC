App = Ember.Application.create();

var map, allData;
    
App.locations = Ember.ArrayController.create();

dojo.addOnLoad(mapInit);


function mapInit() {
  // setting initial view to Santa Monica
  var initExtent = new esri.geometry.Extent({"xmin":-13202928.349916605,"ymin":4027328.5234554973,"xmax":-13175487.456762264,"ymax":4036348.0927931364,"spatialReference":{"wkid":102100}});
  
  map = new esri.Map("mapHere",{extent:initExtent});
  var basemapURL= "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
  var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapURL);
  map.addLayer(basemap);

  dojo.connect(map, 'onLoad', function() {
    jQuery(document).ready(jQueryEmberDataInit);
  });

} // mapInit()

function jQueryEmberDataInit() {  
  jQuery.when(
    jQuery.getJSON('data/cafes.json'), 
    jQuery.getJSON('data/lots.json')
  ).done(function(d0, d1) {
    
    // TODO: separate location type into different layers to more easily toggle visibility
    allData = d0[0].concat(d1[0]);
    // TODO: REMOVE - just quickly ranomizing the array so display's a little more interesting
    allData.sort(function(){return (0.5 - Math.random())});
    App.locations.set('content', allData);
    // TODO: Ember's not really doing much other than rendering the Handlebars template - look at cost of creating each point as Ember object & moving all logic, point creation, map & list data syncing to EmberController... THEN pass it to the view
    App.LocationsView = Ember.View.extend();
    // TODO: allow filter controls to toggle both map layers AND data list, but list filtering via jQ for now
    jQuery('#listFilter button').on('click', function(){
      // TODO: fix binding to allow keyboard, etc interactions
      switch(this.id) {
        // TODO: these animations are lame
        case 'cafes': jQuery('#listItems .listItem').not('.cafe').slideUp().end().filter('.cafe').slideDown(); break;
        case 'lots': jQuery('#listItems .listItem').not('.lot').slideUp().end().filter('.lot').slideDown(); break;
        default: jQuery('#listItems .listItem').slideDown(); break;
      }
    });
    
    // iterate through the combined collection
    for (var i = 0; i < allData.length; i++) {
      // TODO: abstract & simplify this... creation of map/data objects, graphic/point type, color assignment, etc.
      var outerColor = (allData[i]['type']=='cafe') ? new dojo.Color([218,18,18,0.9]) : new dojo.Color([92,156,255,0.9]);
      var innerColor = new dojo.Color([32,62,92,0.4]);
      var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, innerColor, 2), outerColor);
      var thisContent = '<span class="details">'+allData[i]['meta']['details']+'</span><br/><span class="address">'+allData[i]['place']['address']+'</span>';
      addPointToMap(
        allData[i]['place']['lat'], allData[i]['place']['lng'],
        symbol, allData[i]['meta']['name'], thisContent
      );
    }
    
    // TODO: connect list data & map data
  });
  
} // jQueryEmberDataInit()

function addPointToMap(lat, lon, symbol, title, content) {
  var point = new esri.geometry.Point(lon,lat, new esri.SpatialReference({ 'wkid': 4326 }));
  map.graphics.add(new esri.Graphic(
    esri.geometry.geographicToWebMercator(point),
    symbol,
    { 'title': title, 'content': content },
    new esri.InfoTemplate('${title}', '${content}')
  ));
} // addPointToMap()

function zoomAndCenterHere(lat, lon) {
  var point = new esri.geometry.Point(lon,lat, new esri.SpatialReference({ 'wkid': 4326 }));
  var wmpoint = esri.geometry.geographicToWebMercator(point);
  map.centerAndZoom(wmpoint, 14);
} // zoomAndCenterHere()

function zoomCenterAndShowInfoWindowFor(lat, lon, title) {
  var point = new esri.geometry.Point(lon,lat, new esri.SpatialReference({ 'wkid': 4326 }));
  // TODO: quit repeating the same conversions from previous two fns
  var wmpoint = esri.geometry.geographicToWebMercator(point);
  zoomAndCenterHere(lat, lon);
  // TODO: find a non-terrible way to do this
  map.infoWindow.setTitle(title);
  map.infoWindow.show(wmpoint);
} //zoomCenterAndShowInfoWindowFor()