// http://vuejs.org/api/

// TOP LEVEL ATTRIBUTES OF VUE INSTANCES
// el: '#id' element to bind to
// data: {message etc} the data to be displayed or accessed by templates etc
// computed: {reverseMessage: function () {...} } function returns based on data of instance (can use this), caches until dependency changes
// computed: functionName: { get: function () {...}, set: function () {...} } can provide setters - can get by just using instance.functionName
// methods: {reverseMessage: function () {...} } same as above but runs every re-render, rather than caching result
// filters: functionName: function (x) { if !x) return '' x = x.toString() return x
// watch: { functionName: function (val) { ...modify data in instance... } } usually used for async or expensive ops
// components: { 'my-component' : Child } refers to var Child = { template: '...HTML...' }

// LIFECYCLE ATTRIBUTES
// beforeCreate/created/beforeMount/mounted/beforeUpdate/updated/beforeDestroy/destroyed:
//              function()  { ... called upon creation/mounting/etc of instance }

// TEMPLATES
// {{template element}} can hold JS methods (one per {{}}, no declarations or flow control), not just vars or values
// filters can be chained with pipes as in {{ message | filterA | filterB('arg1', arg2) }}
// custom html elements thru: Vue.component('ele-name', { props: ['filling'], template: '<div>{{filling.text}}</div>' })
// pass that filling into each generated element with v-bind:      <ele-name v-for="x in y" v-bind:filling="filling"</ele-name>
// could have something that had all sorts of elements like app-nav, app-view, app-content
// reusable constructors: var x = Vue.extend({...}) var xInstance = new x()
// var x = { a: 1 }
// var vm = new Vue({data: x)}
// x.a === data.a, can update either to update both
// only reactive if applied at time of creation of instance
// can access properties and methods via $ - don't use =>
// vm.$data === x.a:
// vm.$watch('a', function (newA, oldA) {... callback called when vm.a changes})

// DIRECTIVES
// <div v-property="value"></div> have different effects
// v-if and v-else work as expected
// v-if="seen": false hides -- <h1 v-if"ok">Yes<h1> <h1 v-else>No<h1>
    // <template v-if="Math.random() > 0.5">...HTML here...</template>
    // v-show is like v-if EXCEPT no templates, no else, renders but toggles display CSS property, use if constantly toggling element
    // <li v-for="x in y">: {{ x.message }} loops thru json array and adds li for each message, can add index as second arg "(x, index) in y"
    // v-for in templates like v-if -- v-for="value in object" or even v-for="(value, key, index) in object"
    // v-for="n in 10" repeats {{n or whatever else you want}} n times
    // v-for="n in computedFunction" can use computed properties not just data
    // v-on:click="methodName": (under methods, not data) arbitrary methods on event listeners,
    //          on:keyup.enter/tab/delete/esc/space/up/down/left/right OR keyup.13/14/15/etc,
    //          on:remove etc
    // v-on:submit.prevent calls event.preventDefault(),
    //          .stop == stopPropagation(),
    //          .capture uses capture mode when adding listener,
    //          .self only trigger handler if target is the element itself, not a child
    //          .native listen to native event on root element of component
    // v-on:click can be shorthand @click
    // v-on:click="warn('Form cannot be submitted yet.', $event) -- accesses original DOM event in methods
    // can push to data elements as in message.push({text: 'rar'})
    // v-once -- use in component template to only evaluate once if a big static chunk
    // v-model="message" -- creates two-way data bindings on form input and textarea -- updates the model (under data:{message}) with data as well as {{ message }}
    //          can bind multiple v-model="checkedNames" to one data:{"checkedNames"} array
    //          also works on single and multiple select (if in array), radio etc
    // <input type="checkbox" v-model="toggle" v-bind:true-value="a" v-bind:false-value="b"> -- sets checkbox value to dynamic property like vm.a/vm.b
    // v-model.lazy="msg" -- sync after change events rather than each input
    // v-model.number="msg" -- cast as number instead of string
    // v.model.trim="msg" -- trims input automatically
    // v-html="rawHTML"
    // v-bind in general can embed objects and access using dot notation
    // <div v-bind:id="dynamicID"></div> turns #id into something dynamic
    // class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }" with data: { isActive: true, hasError: false } results in class="static active"
    // can bind the above to data or computed objects also - v-bind:class="classObject"  maps to { computed: classObject { isActive etc} }
    // can pass arrays also - v-bind:class="[class1, class2]" or mix and match ternary expressions, object syntax within array syntax
    // v-bind:style just like v-bind:class only CSS syntax "{ color: activeColor, fontSize: fontSize + 'px' }" etc or style="styleObject" or style="array"
    // v-bind:disabled="conditional" attribute removed if condition == false
    // v-bind:href="url" sets href according to value of expression url, v-bind:title etc
    // v-bind:href can also be shorthanded as :href
    // v-for="x in y" :key="x.id" to order items by id/other index properly (using shorthand for v-bind:key)
    // to share state, create a const x = {} that you refer as data: x in your various Vue instances




    // ARRAY CHANGE METHODS

    // example.list.push()/pop()/shift()/unshift()/splice()/sort()/reverse() mutate array and trigger view updates
    // example.list.filter()/concat()/slice() return new array - Vue reuses DOM elements, so is still efficient
    // VUE CANNOT DETECT vm.list[index] = newValue or vm.list.length = newLength -- use Vue.set or example.list.splice(index, 1, newValue)

    // COMPONENTS

    // Vue.component('my-component, { props: ['message'] template: '<div>{{message}}</div>' })
    // best practice is to use lowercase component names with-hyphen because they work with HTML templating
    // <my-component v-for="x in y"></my-component> -- use as normal HTML element AFTER registered
    // COMPONENT CAVEATS USING DOM AS TEMPLATE
    // cannot nest custom components within <ul>, <ol>, <table>, <select> -- workaround using <tr is="my-row">
        // <option> can only appear in specific elements
        // data: { ... } and el: "#name" must contain function to ensure unique handling
        // PARENT components pass data DOWN TO children as PROPS, CHILDREN pass UP as EVENTS
        // if prop is thisFormat, use this-format in HTML (in non-string templates)
        // use v-bind within components to pass dynamic, javascript expressions rather than literal
        // can use v-bind:my-message="parentMsg" to dynamically bind prop to parent data (will update dynamically)
        // props flow data DOWN from parent to child, not UP, any change in parent state will wipe out any props you changed in children
        // IF you need to modify child props, define local data prop in child or computed prop
        // VALIDATE props with type: String/Number/Boolean/Function/Object/Array/CustomConstructor
        // v-on:methodname flows data UP from child to parent
        // create custom input types as long as accepts a value prop and emits input event w/ new value, eg. <webcam-gesture v-model="gesture"></webcam-gesture>
        // communicate between components with var bus = new Vue() instance, then use bus.$emit and bus.$on in A's method and B's hook respectively
        // CONTENT DISTRIBUTION W/ SLOTS
        // <child-component> {{PARENTmessage}} </child-component
                //    Vue.component('child-component', {
                //        // this does work, because we are in the right scope
                //        template: '<div v-show="someChildProperty">Child</div>',
        //        data: function () {
        //            return {
        //                someChildProperty: true
        //            }
        //        }
        //    })
        // parent content DISCARDED unless child component has <slot>
            // <slot>s are fallback content if the hosting element is empty / no content will be inserted
            // use <slot name="header"></slot> to customize how content is distributed - an unnamed slot catches any unmatched content
            // DYNAMIC COMPONENTS
            // Make components dynamic w/ data:{ currentView: 'home'}, components: { home: {}, posts: {}...}
            // use v-bind:is="currentView"
            // OR use var Home = { template: 'HTML' }, data: {currentView: Home}
            // wrap <component> in <keep-alive> to preserve state / not re-render
                // REUSE COMPONENTS LIKE FOLLOWING
                //    <my-component
                //    :foo="baz"
                //    :bar="qux"
                //    @event-a="doThis"
                //    @event-b="doThat"
                //            >
                //            <img slot="icon" src="...">
                //            <p slot="main-text">Hello!</p>
                //    </my-component>
                // use $ref to access child components like so:
                //    <div id="parent"> <user-profile ref="profile"></user-profile>  </div>
                //    var parent = new Vue({ el: '#parent' })
                //    var child = parent.$refs.profile -- note: $refs are not reactive and populate after render, avoid if possible
                // ASYNC (Webpack recommended)
                // Wrap Vue.component('asyncName', function(...) { setTimeout(function(){...}, 1000)}) to trigger function when component needs rendering, cache result
                // use require([./async-component'], callbackName) within component with Webpack code-splitting, or use promises
                // RECURSIVE COMPONENTS
                // use name: 'something', template: '<div><something></something</div>' - make sure you only use with v-if to not max stack
                // inline-template can be used for components, but use template option if possible

                // TRANSITIONS
                // wrap HTML element in <transition name="whatever">
                    // TRANSITION CLASSES (in order) -- v-enter, v-enter-active, v-leave, v-leave-active
                    // define .fade-enter-active, .fade-leave-active, .fade-enter etc behaviors in css
                    // can use with CSS animations and @keyframes -- animation.bounce-in .5s; @keyframes bounce-in {0% {} 50% {} 100% {}}
                    // combine w/ Animate.css etc by overriding enter-class, enter-active-class, leave-class and leave-active-class within transition
                    // can define JS hooks w/ v-on:enter="enter" etc referring to methods: {enter: function (el, done) {} -- done callback required for enter & leave
                    // TIP - v-bind:css="false" for JS-only transitions to not conflict w/ CSS
                    // appear attribute uses enter and leave transitions by default, can customize as usual
                    // if transitioning w/ if-else, key elements like so --
                    //    <transition>
                    //    <button v-bind:key="isEditing">
                    //            {{ isEditing ? 'Save' : 'Edit' }}
                    //    </button>
                    //    </transition>
                    //     can use docState as a switch, for example --
                    //    <transition>
                    //    <button v-bind:key="docState">
                    //            {{ buttonMessage }}
                    //    </button>
                    //    </transition>
                    //    computed: {
                    //        buttonMessage: function () {
                    //            switch (docState) {
                    //                case 'saved': return 'Edit'
                    //                case 'edited': return 'Save'
                    //                case 'editing': return 'Cancel'
                    //    }}}
                    // use mode="out-in" or "in-out" to change transition behavior
                    // transition between components also
                    // use transition-group name="list" to transition whole list at once, lots of magic in official docs