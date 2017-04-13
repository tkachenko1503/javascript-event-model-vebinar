var pubsub = (function() {
    var topics = {};

    return {
        subscribe: function(topic, listener) {
            if (!topics[topic]) {
                topics[topic] = [];
            }

            var index = topics[topic].push(listener) - 1;

            return {
                remove: function() {
                    delete topics[topic][index];
                }
            };
        },

        publish: function(topic, args) {
            if (!topics[topic]) {
                return false;
            }

            setTimeout(function() {
                var subscribers = topics[topic];
                var i = subscribers ? subscribers.length : 0;

                while (i--) {
                    subscribers[i].func(topic, args);
                }
            }, 0);
        }
    };
}());

var subscription = pubsub.subscribe('/page/load', function(obj) {
    // Do something now that the event has occurred
});

pubsub.publish('/page/load', {
    url: '/some/url/path' // any argument
});

subscription.remove();