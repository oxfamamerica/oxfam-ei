$(document).ready(function() {

	var mobile = false;

  var url = Qurl.create();

  var path = d3.geo.path().projection(null);

  var m_width = $(".map-container").outerWidth(),
      widthMap = 900,
      heightMap = 390,
      aspectMap = heightMap / widthMap;

  var svgMap = d3.select('#map')
      .attr('preserveAspectRatio', 'xMidYMin')
      .attr('viewBox', '70 35 ' + widthMap + ' ' + heightMap)
      .attr('width', m_width)
      .attr('height', Math.ceil(m_width * aspectMap));

  var features,
      tooltip,
      countryPolygons,
      pin,
      pinElements;

  var zoom,
      t = [0, 0],
      s = 1,
      ox = widthMap / 2,
      oy = widthMap / 2,
      countryBorderWidth = 0.75;

	var IDs = [];

  var nameById = {},
      hiddenById = {},
      flagById = {},
      snapshotById = {},
      pinPositionById = {},
      stakesById = {},
      photoByID = {},
      photoCaptionById = {},
      doingById = {},
      outline1ById  = {},
      outline2ById  = {},
      outline3ById  = {},
      outline4ById  = {},
      partner1ById = {},
      partner2ById = {},
      partner3ById = {},
      partner4ById = {},
      partner5ById = {},
      partner6ById = {},
      partner7ById = {},
      partner8ById = {},
      partner9ById = {},
      partner10ById = {},
      donor1ById = {},
      donor2ById = {},
      donor3ById = {},
      donor4ById = {},
      donor5ById = {},
      learnMore1ById = {},
      learnMore2ById = {},
      learnMore3ById = {},
      learnMore4ById = {},
      learnMore5ById = {},
      learnMore6ById = {},
      contact1ById = {},
      contact2ById = {},
      customTitleById = {},
      custom1ById = {},
      custom2ById = {},
      custom3ById = {},
      countryList = [];

  var tableHeight;

  var pinDefs = {
      fill: '#007AA6',
      stroke: '#FFFFFF',
      strokewidth: '2',
      d: 'M15.9,1C9.8,1,4.8,6,4.8,12.1s11.1,18.4,11.1,18.4S27,18.2,27,12.1 S22,1,15.9,1z'
  };

  var listView = true;

  function sharrreInit() {
    var $SharrreTwitter  = $('.twitter-count'),
        $SharrreFacebook = $('.facebook-count'),
        $SharrreGoogle   = $('.googleplus-count');

    if ($SharrreTwitter.length || $SharrreFacebook.length || $SharrreGoogle.length) {
      $SharrreTwitter.sharrre({
        share: {
          twitter: true
        },
        enableHover: false,
        enableTracking: true,
        buttons: { twitter: {via: 'OxfamAmerica'}},
        click: function(api) {
          api.simulateClick();
          api.openPopup('twitter');
        }
      });

      $SharrreFacebook.sharrre({
          share: {
            facebook: true
          },
          enableHover: false,
          enableTracking: true,
          click: function(api) {
            api.simulateClick();
            api.openPopup('facebook');
          }
      });

      $SharrreGoogle.sharrre({
          share: {
            googlePlus: true
          },
          enableHover: false,
          enableTracking: true,
          click: function(api) {
            api.simulateClick();
            api.openPopup('googlePlus');
          }
      });
    }
  } // end sharrreInit


	function csvInit(filename) {
    queue()
      .defer(d3.csv, filename)
      .defer(d3.json, "json/earth.json")
      .await(ready);
  }


  function ready(error, mapData, mapJSON) {
    $.each(mapData, function(i, d) { nameById[d.id] = d.displayName; });
    $.each(mapData, function(i, d) { if ( d.hidden === 'Y' ) { hiddenById[d.id] = true; } else { hiddenById[d.id] = false; } });
    $.each(mapData, function(i, d) { flagById[d.id] = d.flagURL; });
    $.each(mapData, function(i, d) { snapshotById[d.id] = d.snapshot; });
    $.each(mapData, function(i, d) { pinPositionById[d.id] = d.pinPosition; });
    $.each(mapData, function(i, d) { stakesById[d.id] = d.stakes; });
    $.each(mapData, function(i, d) { photoByID[d.id] = d.photoURL; });
    $.each(mapData, function(i, d) { photoCaptionById[d.id] = d.photoCaption; });
    $.each(mapData, function(i, d) { doingById[d.id] = d.doing; });
    $.each(mapData, function(i, d) { outline1ById[d.id] = d.outline1; });
    $.each(mapData, function(i, d) { outline2ById[d.id] = d.outline2; });
    $.each(mapData, function(i, d) { outline3ById[d.id] = d.outline3; });
    $.each(mapData, function(i, d) { outline4ById[d.id] = d.outline4; });
    $.each(mapData, function(i, d) { partner1ById[d.id] = d.partner1; });
    $.each(mapData, function(i, d) { partner2ById[d.id] = d.partner2; });
    $.each(mapData, function(i, d) { partner3ById[d.id] = d.partner3; });
    $.each(mapData, function(i, d) { partner4ById[d.id] = d.partner4; });
    $.each(mapData, function(i, d) { partner5ById[d.id] = d.partner5; });
    $.each(mapData, function(i, d) { partner6ById[d.id] = d.partner6; });
    $.each(mapData, function(i, d) { partner7ById[d.id] = d.partner7; });
    $.each(mapData, function(i, d) { partner8ById[d.id] = d.partner8; });
    $.each(mapData, function(i, d) { partner9ById[d.id] = d.partner9; });
    $.each(mapData, function(i, d) { partner10ById[d.id] = d.partner10; });
    $.each(mapData, function(i, d) { donor1ById[d.id] = d.donor1; });
    $.each(mapData, function(i, d) { donor2ById[d.id] = d.donor2; });
    $.each(mapData, function(i, d) { donor3ById[d.id] = d.donor3; });
    $.each(mapData, function(i, d) { donor4ById[d.id] = d.donor4; });
    $.each(mapData, function(i, d) { donor5ById[d.id] = d.donor5; });
    $.each(mapData, function(i, d) { learnMore1ById[d.id] = d.learnMore1; });
    $.each(mapData, function(i, d) { learnMore2ById[d.id] = d.learnMore2; });
    $.each(mapData, function(i, d) { learnMore3ById[d.id] = d.learnMore3; });
    $.each(mapData, function(i, d) { learnMore4ById[d.id] = d.learnMore4; });
    $.each(mapData, function(i, d) { learnMore5ById[d.id] = d.learnMore5; });
    $.each(mapData, function(i, d) { learnMore6ById[d.id] = d.learnMore6; });
    $.each(mapData, function(i, d) { contact1ById[d.id] = d.contact1; });
    $.each(mapData, function(i, d) { contact2ById[d.id] = d.contact2; });
    $.each(mapData, function(i, d) { customTitleById[d.id] = d.customTitle; });
    $.each(mapData, function(i, d) { custom1ById[d.id] = d.custom1; });
    $.each(mapData, function(i, d) { custom2ById[d.id] = d.custom2; });
    $.each(mapData, function(i, d) { custom3ById[d.id] = d.custom3; });
    $.each(mapData, function(i, d) { countryList[i] = d.id; });

		// Loop through the CSV, grab just the fields needed for the table view
		// and create a new VAR to use for the drawTableView function
    var tableData = [];

    for (var i = 0; i < mapData.length; i += 1) {
      if ( mapData[i].hidden !== 'Y' ) {
        var tempData = [];
        tempData.push(mapData[i].flagURL);
        tempData.push(mapData[i].displayName);
        tempData.push(mapData[i].snapshot);
        tempData.push(mapData[i].id);
        tableData.push(tempData);
				IDs.push(mapData[i].id);
      }
    }

    drawEarth(mapJSON);
    drawTableView(tableData);
  } // end ready



	function isInCSV(value) {
    return IDs.indexOf(value) > -1;
  }



  function drawTableView(data) {
    d3.select('.table-wrapper')
      .append('table')
      .selectAll('tr')
      .data(data)
      .enter()
      .append('tr')
      .attr('class', function(d, i) { if ( i === (data.length - 1) ) { return 'last'; }})
      .on('mouseover', function(d) {
          if ( listView && !mobile ) {
              d3.select(this).classed('hover', true);
              drawPin(d[3]);
              d3.select('path.' + d[3]).classed('hover', true);
          }
      })
      .on('mouseout', function() {
          if ( !mobile ) {
            if ( listView ) {
              features.select('g.pin').remove();
            }
            d3.selectAll('path.country').classed('hover', false);
            d3.select(this).classed('hover', false);
          }
      })
      .on('click', function(d) {
          listView = false;
          url.query('country', d[3]);
          setActiveCountry(d[3]);
          zoomTo(d[3]);
          if ( $('body').scrollTop() > 500 ) {
              $('html, body').animate({ 'scrollTop': $('#map').offset().top }, 500, 'swing');
          }
      })
      .selectAll('td')
      .data(function(d) { return d; })
      .enter()
      .append('td')
      .attr('class', function(d, i) { return 'col' + (i + 1); })
      .html(function(d, i) {
        if (i === 0) {
          return ('<img src="' + d + '" alt="flag">');
        } else if ( i === 3 ) {
          return ('<a href="javascript:;">Learn more »</a>');
        } else {
          return d;
        }
      });

      // chech every 300ms to see if last item has been added to DOM before setting height.
      // otherwise the height will be set too soon, be incorrect and weird scrolling happens.
      var timer = setInterval(function() {
        if ( $('tr.last').length ) {
          tableHeight = $('.table-wrapper').outerHeight();
          $('.lower-content').outerHeight($('.table-wrapper').outerHeight());
          clearInterval(timer);
        }
      }, 300);
  } //end drawTableView



  function drawEarth(earth) {
    zoom = d3.behavior.zoom().on('zoom', zoomed);

    if ( mobile ) {
      zoom.scaleExtent([1, 14]);
    } else {
      zoom.scaleExtent([1, 8]);
    }

    svgMap.call(zoom)
      .on('dblclick.zoom', null)
      .on('mousewheel.zoom', null)
      .on('DOMMouseScroll.zoom', null)
      .on('wheel.zoom', null);

    features = svgMap.append('g').classed('features', true);

    features.selectAll('path.land')
      .data(topojson.feature(earth, earth.objects.land).features)
      .enter()
      .append('path')
      .classed('land', 'true')
      .attr('d', path);

    countryPolygons = features.selectAll('path.country')
      .data(topojson.feature(earth, earth.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', function(d) {
        if ( !hiddenById[d.id] && isInCSV(d.id) ) {
          return 'country ' + d.id;
        } else {
          return 'country noshow ' + d.id;
        }
      })
      .attr('d', path)
      .style('stroke-width', function() {
        return countryBorderWidth + 'px';
      })
      .on('mouseover', function(d) {
        if ( !mobile) {
          tooltip = d3.select('#interactive').append('div').attr('id', 'mapTooltip');
          var thisPath = d3.select(this);

          if ( $('path.active').length ) {
            pinElements.transition().duration(400)
							.ease('back').attr('transform', 'scale(0)');
          }

          if ( !thisPath.classed('active') ) {
            thisPath.classed('hover', true);
            tooltip
              .html('<h5>' + nameById[d.id] + '</h5><p>' + snapshotById[d.id] + '</p><p class="more">Click to learn more</p>')
              .style('display', 'block');
          }
        }
      })
      .on('mousemove', function() {
        if ( !mobile ) {
          if (d3.mouse(document.getElementById('interactive'))[0] < $('#interactive').width() / 1.5) {
              tooltip
                .classed('left', true)
                .style('left', (d3.mouse(document.getElementById('interactive'))[0] + 25) + 'px')
                .style('top', (d3.mouse(document.getElementById('interactive'))[1] - 15) + 'px');
          } else {
            tooltip
              .classed('right', true)
              .style('left', (d3.mouse(document.getElementById('interactive'))[0] - 220) + 'px')
              .style('top', (d3.mouse(document.getElementById('interactive'))[1] - 15) + 'px');
          }
        }
      })
      .on('mouseout', function() {
        if ( !mobile ) {
          var thisPath = d3.select(this);
          thisPath.classed('hover', false);
          tooltip.remove();

          if ( $('path.active').length ) {
            pinElements.transition().delay(250).duration(1000)
							.ease('elastic').attr('transform', 'scale(' + 1/s + ')');
          }
        }
      })
      .on('click', function(d) {
        if (d3.event.defaultPrevented) { return; }
        if ( !d3.select(this).classed('active') ) {
          setActiveCountry(d.id);
          zoomTo(d.id);
        }
        if ( $(window).height() - ($('h2.country-name').offset().top - $(window).scrollTop()) < 90 ) {
          $('html, body').animate({ 'scrollTop': $('h2.country-name').offset().top - 300 }, 500, 'swing');
        }
      });

      if ( url.query('country') ) {
        setActiveCountry(url.query('country'));
        zoomTo(url.query('country'));
      }
  } // end drawEarth



  function drawPin(id) {
    pin = features.append('g').classed('pin', true)
      .attr('transform', 'translate(' + pinPositionById[id] + ')');

    pinElements = pin.append('g').attr('transform', 'scale(0)');

    pinElements.append('path')
      .attr('d', function() { return pinDefs.d; })
      .attr('transform', 'translate(-16, -32)')
      .style('stroke', function() { return pinDefs.stroke; })
      .style('stroke-width', function() { return pinDefs.strokewidth; })
      .style('stroke-miterlimit', '10')
      .style('fill', function() { return pinDefs.fill; });

    pinElements.append('circle')
      .attr('cx', '15.9')
      .attr('cy', '11.2')
      .attr('r', '2.8')
      .attr('transform', 'translate(-16, -32)')
      .style('fill', '#ffffff');

    pinElements.transition().duration(1000).ease('elastic').attr('transform', 'scale(' + 1/s + ')');
  }



  function updateFeatures() {
    if ( mobile ) {
      features.attr('transform', 'translate(' + t + ')scale(' + s + ')');
      features.select('.country').style('stroke-width', countryBorderWidth / s + 'px');
    } else {
      features.transition().duration(500)
        .attr('transform', 'translate(' + t + ')scale(' + s + ')');
      features.selectAll('.country').transition().duration(500)
        .style('stroke-width', countryBorderWidth / s + 'px');
      if ( !listView ) {
        pinElements.transition().duration(500)
          .attr('transform', 'scale(' + 1/s + ')');
      }
    }
  }



  function setActiveCountry(id) {
    listView = false;

		d3.selectAll('path.country').classed('active', false);
		features.select('g.pin').remove();
		d3.select('path.' + id).classed('active', true);
		drawPin(id);
    updateNarrative(id);
    d3.select('.country-wrapper').classed('offscreen', false);
    d3.select('.table-wrapper').classed('offscreen', true);
    d3.select('.lower-content').style('height', 'auto');
    d3.select('.lower-content').style('min-height', '500px');
    url.query('country', id);
  }



  function zoomed() {
    d3.select('#mapTooltip').remove();

    t = d3.event.translate;
    s = d3.event.scale;

    t[0] = Math.min((widthMap / 2 - ox) * (s - 1), Math.max((widthMap / 2 + ox + 150) * (1 - s), t[0]));
    t[1] = Math.min((heightMap / 2 - oy + 200) * (s - 1), Math.max((heightMap / 2 + oy - 180)  * (1 - s), t[1]));

    zoom.translate(t);

    features.attr('transform', 'translate(' + t + ')scale(' + s + ')');
    features.selectAll('.country').style('stroke-width', countryBorderWidth / s + 'px');
  }



  function resetZoom() {
    d3.select('#mapTooltip').remove();
    s = 1;
    t = [0, 0];

    if (zoom.scale() > zoom.scaleExtent()[0]) {
      zoom.scale(s);
      zoom.translate(t);
      updateFeatures();
    }
  }


  function zoomTo(location) {
    t = zoom.translate();

    var theSelection = d3.select('path.' + location);

    var element = theSelection.node(),
      bbox = element.getBBox(),
      bboxArea = bbox.width * bbox.height;

    var zoomX = bbox.x + bbox.width/2,
      zoomY = bbox.y + bbox.height/2;

    if (bboxArea < 100) {
      s = 4;
    } else {
      s = 2;
    }

    t[0] = -((zoomX * s) - (widthMap / 1.35));


    if (zoomY < 130 ) {
      t[1] = -((zoomY * s) - (heightMap / 4));
    } else {
      t[1] = -((zoomY * s) - (heightMap / 2));
    }


    t[0] = Math.min((widthMap / 2 - ox) * (s - 1), Math.max((widthMap / 2 + ox + 150) * (1 - s), t[0]));
    t[1] = Math.min((heightMap / 2 - oy + 200) * (s - 1), Math.max((heightMap / 2 + oy - 180)  * (1 - s), t[1]));

    zoom.scale(s).translate(t);
    updateFeatures();
  } // end zoomTo



	function updateNarrative(id) {
    var nextId;
    var looper = true;
    var i = countryList.indexOf(id) + 1;

    while (looper) {
	    if ( countryList.indexOf(id) === countryList.length - 1 ) {
	      i = 0;
	    }

	    if ( hiddenById[countryList[i]] ) {
	      i += 1;
	    }

	    if ( !hiddenById[countryList[i]] ) {
	      nextId = countryList[i];
	      looper = false;
	    }
    }

    d3.select('h2.country-name > span').html(nameById[id]);
    d3.select('h2.country-name > img').attr("src", function() { return flagById[id]; });
    d3.select('a.next-country-btn')
      .text(function() { return nameById[nextId]; })
      .on("click", function() {
        setActiveCountry(nextId);
        zoomTo(nextId);
      });

    if ( stakesById[id] !== "" ) {
      d3.select('.stakes-content').html(stakesById[id]);
    }

    if ( photoByID[id] !== "" ) {
      d3.select('figure.cmpnt-full-article-main-img').classed('hidden', false);
      d3.select('img.country-photo').attr("src", function() { return photoByID[id]; });
    } else {
      d3.select('figure.cmpnt-full-article-main-img').classed('hidden', true);
    }

    if ( photoCaptionById[id] !== "" ) {
      d3.select('figure.cmpnt-full-article-main-img > figcaption').html(photoCaptionById[id]);
    }

    if ( doingById[id] !== "" ) {
      d3.select('.doing-content').html(doingById[id]);
    }

    // EMPTY THE SIDEBAR
    d3.select('.sidebar-block-wrapper').html('');

    // ADD SECTOR OUTLINE
    if ( outline1ById[id] !== "" ) {
      d3.select('.sidebar-block-wrapper').append('div')
        .classed('sidebar-block', true)
        .classed('sector-outline', true)
        .html('<h4>Sector outline</h4><ul><li>' + outline1ById[id] + '</li></ul>');

      if ( outline2ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper > .sector-outline > ul')
          .append('li')
          .html(outline2ById[id]);
      }

      if ( outline3ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper > .sector-outline > ul')
          .append('li')
          .html(outline3ById[id]);
      }

      if ( outline4ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper > .sector-outline > ul')
          .append('li')
          .html(outline4ById[id]);
      }
    }

      // ADD THE SNAPSHOT TO THE SIDEBAR
      // d3.select('.sidebar-block-wrapper').append('div')
      //     .classed('sidebar-block', true)
      //     .html('<h4>Snapshot</h4><ul><li>' + snapshotById[id] + '</li></ul>');

    // ADD PARTNERS
    if ( partner1ById[id] !== "" ) {
      d3.select('.sidebar-block-wrapper').append('div')
        .classed('sidebar-block', true)
        .classed('partners', true)
        .html('<h4>Partners</h4><ul><li>' + partner1ById[id] + '</li></ul>');

      if ( partner2ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper > .partners > ul')
          .append('li')
          .html(partner2ById[id]);
      }

      if ( partner3ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner3ById[id]);
      }

      if ( partner4ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner4ById[id]);
      }

      if ( partner5ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner5ById[id]);
      }

      if ( partner6ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner6ById[id]);
      }

      if ( partner7ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner7ById[id]);
      }

      if ( partner8ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner8ById[id]);
      }

      if ( partner9ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner9ById[id]);
      }

      if ( partner10ById[id] !== "" ) {
          d3.select('.sidebar-block-wrapper > .partners > ul')
              .append('li')
              .html(partner10ById[id]);
      }
    }

    // ADD DONORS
    if ( donor1ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper').append('div')
            .classed('sidebar-block', true)
            .classed('donors', true)
            .html('<h4>Donors</h4><ul><li>' + donor1ById[id] + '</li></ul>');

        if ( donor2ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .donors > ul')
                .append('li')
                .html(donor2ById[id]);
        }

        if ( donor3ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .donors > ul')
                .append('li')
                .html(donor3ById[id]);
        }

        if ( donor4ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .donors > ul')
                .append('li')
                .html(donor4ById[id]);
        }

        if ( donor5ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .donors > ul')
                .append('li')
                .html(donor5ById[id]);
        }
    }

    // ADD LEARN MORE
    if ( learnMore1ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper').append('div')
            .classed('sidebar-block', true)
            .classed('learn-more', true)
            .html('<h4>Learn more</h4><ul><li>' + learnMore1ById[id] + '</li></ul>');

        if ( learnMore2ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .learn-more > ul')
                .append('li')
                .html(learnMore2ById[id]);
        }

        if ( learnMore3ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .learn-more > ul')
                .append('li')
                .html(learnMore3ById[id]);
        }

        if ( learnMore4ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .learn-more > ul')
                .append('li')
                .html(learnMore4ById[id]);
        }

        if ( learnMore5ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .learn-more > ul')
                .append('li')
                .html(learnMore5ById[id]);
        }

        if ( learnMore6ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .learn-more > ul')
                .append('li')
                .html(learnMore6ById[id]);
        }
    }


    // ADD CUSTOM FIELDS
    if ( customTitleById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper').append('div')
            .classed('sidebar-block', true)
            .classed('custom-fields', true)
            .html('<h4>' + customTitleById[id] + '</h4><ul><li>' + custom1ById[id] + '</li></ul>');

        if ( custom2ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .custom-fields > ul')
                .append('li')
                .html(custom2ById[id]);
        }

        if ( custom3ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .custom-fields > ul')
                .append('li')
                .html(custom3ById[id]);
        }
    }


    // ADD CONTACTS
    if ( contact1ById[id] !== "" ) {
        d3.select('.sidebar-block-wrapper').append('div')
            .classed('sidebar-block', true)
            .classed('contact', true)
            .html('<h4>Contact</h4><ul><li>' + contact1ById[id] + '</li></ul>');

        if ( contact2ById[id] !== "" ) {
            d3.select('.sidebar-block-wrapper > .contact > ul')
                .append('li')
                .html(contact2ById[id]);
        }
    }



      // Update sharrre target URLs

      $('#twitter .box').remove();
      $('#facebook .box').remove();
      $('#googleplus .box').remove();

      var twitterClone = $('#twitter').clone();
      var fbClone = $('#facebook').clone();
      var googleClone = $('#googleplus').clone();

      $('#twitter').remove();
      $('#facebook').remove();
      $('#googleplus').remove();
      $('#social-sharrre').append(twitterClone);
      $('#social-sharrre').append(fbClone);
      $('#social-sharrre').append(googleClone);
      $('#twitter').data('text', 'Global Extractive Industries Program — ' + nameById[id]);
      $('#twitter').data('url', window.location.href);

      sharrreInit();

  } // end updateNarrative




  // ****************************************************************
  // Actions and function calls
  // ****************************************************************


	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobile = true;
  }


  $(window).resize(function() {
    var w = $('.map-container').outerWidth();
    svgMap.attr('width', w);
    svgMap.attr('height', w * aspectMap);
  });


  window.addEventListener('load', function() {
    FastClick.attach(document.getElementById('interactive'));
  }, false);


  d3.select('.zoomInBtn').on('click', function() {
    if (zoom.scale() * 2 <= zoom.scaleExtent()[1]) {
      s = zoom.scale() * 2;
      t = zoom.translate();

      t[0] = t[0] * 2 - (widthMap / 2);
      t[1] = t[1] * 2 - (heightMap / 2);

      zoom.scale(s);
      zoom.translate(t);
      updateFeatures();
    }
  });

  d3.select('.zoomOutBtn').on('click', function() {
    d3.select('#mapTooltip').remove();

    if (zoom.scale() > zoom.scaleExtent()[0]) {
      if (s < zoom.scaleExtent()[0]) { s = zoom.scaleExtent()[0]; }

      s = Math.max( zoom.scale() / 2, zoom.scaleExtent()[0] );
      t = zoom.translate();

      t[0] = t[0] / 2 + (widthMap / 4);
      t[1] = t[1] / 2 + (heightMap / 4);

      t[0] = Math.min((widthMap / 2 - ox) * (s - 1), Math.max((widthMap / 2 + ox + 150) * (1 - s), t[0]));
      t[1] = Math.min((heightMap / 2 - oy + 175) * (s - 1), Math.max((heightMap / 2 + oy - 200)  * (1 - s), t[1]));

      zoom.scale(s);
      zoom.translate(t);
      updateFeatures();
    }
  });

  $('a.list-view-btn').on('click', function() {
    tableHeight = $('.table-wrapper').outerHeight();
    d3.select('.lower-content').style('min-height', tableHeight + 'px');
    console.log(tableHeight);
    url.query('country', false);
    listView = true;
    $('.country-wrapper').addClass('offscreen');
    $('.table-wrapper').removeClass('offscreen');

		d3.selectAll('path.country').classed('active', false);
		features.select('g.pin').remove();
		resetZoom();
  });

	// Load the CSV file and get the party started. The function parameter is
	// the path and file name of the csv to load
	csvInit('data/ei-countries.csv');
});
