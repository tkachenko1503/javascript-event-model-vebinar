var EventEmitter = function () {
    this.topics = {};
};

EventEmitter.prototype = {
    on: function(topic, listener, context) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        var index = this.topics[topic].push({
            func: listener,
            ctx: context
        }) - 1;

        return {
            remove: function() {
                delete this.topics[topic][index];
            }
        };
    },

    emit: function(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }
        
        var _topics = this.topics;

        setTimeout(function() {
            var subscribers = _topics[topic];
            var i = subscribers ? subscribers.length : 0;

            while (i--) {
                subscribers[i].func.call(subscribers[i].ctx, args);
            }
        }, 0);
    }
};

var User = function (name) {
    this.name = name;
    EventEmitter.call(this);
};

User.prototype.__proto__ = EventEmitter.prototype;
User.prototype.changeName = function (newName) {
    this.name = newName;
    
    this.emit('userChangeName', this.name);
};


var Greeting = function (user) {
    this.user = user;

    user.on('userChangeName', this.render, this);
};

Greeting.prototype.render = function () {
    console.log('Hello ' + this.user.name);
};

var sergey = new User('Sergey');
var greet = new Greeting(sergey);

greet.render();
sergey.changeName('Vasya');