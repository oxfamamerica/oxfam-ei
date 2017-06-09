countries.geojson:
	ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('AUS', 'BOL', 'BRA', 'BFA', 'KHM', 'COL', 'DOM', 'SLV', 'GHA', 'GTM', 'HTI', 'HND', 'IDN', 'KEN', 'LAO', 'MWI', 'MLI', 'MEX', 'MOZ', 'NER', 'PNG', 'PER', 'SEN', 'ZAF', 'SDS', 'TZA', 'UGA', 'USA', 'VNM', 'ZMB', 'ZWE', 'COD', 'IND', 'NGA', 'LBR', 'ETH', 'CAN', 'FRA', 'GBR', 'NLD', 'ESP', 'NIC', 'MMR', 'SLE', 'TLS', 'DNK', 'FJI', 'MRT')" countries.geojson ne_110m_admin_0_countries.shp

land.geojson:
	ogr2ogr -f GeoJSON land.geojson ne_110m_land.shp

markers.geojson:
	ogr2ogr -f GeoJSON markers.geojson mapmarkers.shp

earth.json: countries.geojson land.geojson markers.geojson
	topojson -o earth.json --projection 'd3.geo.robinson()' --id-property adm0_a3 -p markerid -- countries.geojson land.geojson markers.geojson
	rm -f countries.geojson
	rm -f land.geojson
	rm -f markers.geojson
