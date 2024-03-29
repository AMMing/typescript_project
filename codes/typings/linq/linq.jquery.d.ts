// Type definitions for linq.jquery (from linq.js)
// Project: http://linqjs.codeplex.com/
// Definitions by: neuecc <http://www.codeplex.com/site/users/view/neuecc>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="linq.d.ts"/>

declare module linq {
    interface Enumerable<T> {
        TojQuery(): JQuery;
    }
}

interface JQuery {
    toEnumerable(): linq.Enumerable<JQuery>;
}

interface JQueryStatic {
    Enumerable: linq.EnumerableStatic;
}