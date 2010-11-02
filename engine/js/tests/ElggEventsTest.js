ElggEventsTest = TestCase("ElggEventsTest");

ElggEventsTest.prototype.setUp = function() {
	elgg.config.events = {};
	elgg.provide('elgg.config.events.all.all');
};

ElggEventsTest.prototype.testEventHandlersMustBeFunctions = function() {
	assertException(function() { elgg.register_event_handler('str', 'str', 'oops'); });
};

ElggEventsTest.prototype.testReturnValueDefaultsToTrue = function() {
	assertTrue(elgg.trigger_event('fee', 'fum'));
	
	elgg.register_event_handler('fee', 'fum', function() {});
	assertTrue(elgg.trigger_event('fee', 'fum'));
};

ElggEventsTest.prototype.testCanGlomEventsWithAll = function() {
	elgg.register_event_handler('all', 'bar', function() { throw new Error(); });
	assertException("all,bar", function() { elgg.trigger_event('foo', 'bar'); });
	
	elgg.register_event_handler('foo', 'all', function() { throw new Error(); });
	assertException("foo,all", function() { elgg.trigger_event('foo', 'baz'); });
	
	elgg.register_event_handler('all', 'all', function() { throw new Error(); });	
	assertException("all,all", function() { elgg.trigger_event('pinky', 'winky'); });
};