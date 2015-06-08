# -*- coding: utf-8 -*-
"""
bCharts: Constructors for all different charts from bChart.
"""

import json

class bChart():
	"""Abstract Base Class for all Chart types"""
	def __init__(self, selector=None, chartType=None, options=None):
		if options is None:
			if chartType is None:
				self.options = {}
			elif chartType == "area":
				with open("./json/area.json", "w") as f:
					print f
					self.options = f
		else: 
			self.options = options

		if selector is None:
			raise ValueError("Please initialize the chart with a CSS selector")
		else:
			self.selector = selector
			self.options['selector'] = self.selector

		if chartType is None:
			raise ValueError("Please initialize the chart type!")
		else:
			self.chartType = chartType
			self.options['chartType'] = self.chartType

	def load(self, data):
		if data is None:
			raise ValueError("Please load a 2-dimension list or an json style object")
		else:
			if isinstance(data,list):
				if not isinstance(data[0], list):
					raise ValueError("Please load a 2-dimension list")
				else:
					if not "data" in self.options:
						self.options['data'] = {
							"dataValue": [],
							"groups": [],
							"groups2": [],
							"x": []
						}
					for i in range(0,len(data)):
						self.options['data']['dataValue'].append([])
						# print i
						for j in data[i]:
							self.options['data']['dataValue'][i].append(j)
			else:
				self.options.data = data;
		return self

	def unload(self, groupList):
		if groupList is None or not isinstance(groupList, list):
			raise ValueError("Please load a list of data name to unload data")
		else:
			self.options.unloadData = groupList
		return self

	def colors(self, colorList):
		if colorList is None:
			return self.options.colors
		else:
			if not isinstance(colorList, list):
				raise ValueError("Please input a list of colors.")
			else:
				self.options.colors = colorList
		return self

	def legend(self, propertyKey, propertyValue):
		if not "legend" in self.options:
			self.options["legend"] = {}
		if propertyKey is None and propertyValue is None:
			return self.options["legend"]
		else:
			if propertyValue is None:
				if isinstance(propertyKey, basestring):
					raise ValueError("Please input a value of the property")
				else:
					self.options["legend"] = propertyKey
			else:
				self.options["legend"][propertyKey] = propertyValue
		return self



	def to_json(self, filePath=None):
		if filePath is None:
			filePath = './bchart.json'
		with open(filePath, 'w') as f:
			json.dump(self.options, f)


class BarChart(bChart):
	"""Support group bar and stack bar chart"""
	def __init__(self, selector=None, options=None):
		super(BarChart, self).__init__(selector, 'bar', options)

class LineChart(bChart):
	"""Support line and multi-line chart"""
	def __init__(self, selector=None, options=None):
		super(LineChart, self).__init__(selector, 'line', options)

class AreaChart(bChart):
	"""Support area and stack area chart"""
	def __init__(self, selector=None, options=None):
		super(AreaChart, self).__init__(selector, 'area', options)

class ScatterChart(bChart):
	"""Support scatter chart"""
	def __init__(self, selector=None, options=None):
		super(ScatterChart, self).__init__(selector, 'scatter', options)

class BubbleChart(bChart):
	"""Support bubble chart"""
	def __init__(self, selector=None, options=None):
		super(BubbleChart, self).__init__(selector, 'bubble', options)

class PieChart(bChart):
	"""Support for piechart"""
	def __init__(self, selector=None, options=None):
		super(PieC, self).__init__(selector, 'pie', options)
						

				
