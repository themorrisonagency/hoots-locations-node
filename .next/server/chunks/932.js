exports.id = 932;
exports.ids = [932];
exports.modules = {

/***/ 1288:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Home_container__bCOhY",
	"main": "Home_main__nLjiQ",
	"footer": "Home_footer____T7K",
	"title": "Home_title__T09hD",
	"description": "Home_description__41Owk",
	"code": "Home_code__suPER",
	"grid": "Home_grid__GxQ85",
	"card": "Home_card___LpL1",
	"logo": "Home_logo__27_tb"
};


/***/ }),

/***/ 9402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ah": () => (/* binding */ useAddLocationMutation),
/* harmony export */   "Tg": () => (/* binding */ useUpdateComingSoonMutation),
/* harmony export */   "B_": () => (/* binding */ useUpdateVisibilityMutation),
/* harmony export */   "yU": () => (/* binding */ useLocationQuery),
/* harmony export */   "qo": () => (/* binding */ useLocationsQuery)
/* harmony export */ });
/* unused harmony exports LocationSnippetFragmentDoc, AddLocationDocument, UpdateComingSoonDocument, UpdateVisibilityDocument, LocationDocument, LocationsDocument */
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_1__);


const LocationSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment LocationSnippet on Location {
  id
  c_oloID
  address
  description
  hours
  name
  c_cateringURL
  c_locationHighlights
  c_locationShortName
  c_locationSlug
  c_locationName
  c_mapTile
  c_promoGraphic
  c_masthead
  c_mapUrl
  visible
  comingSoon
  c_comingSoonText
  c_promoUrl
  c_shortDescription
  geocodedCoordinate
  mainPhone
  orderUrl
  yextId
  hoursString
}
    `;
const AddLocationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation AddLocation($options: LocationInput!) {
  addLocation(options: $options)
}
    `;
function useAddLocationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(AddLocationDocument);
}
const UpdateComingSoonDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation updateComingSoon($input: UpdateComingSoonInput!) {
  updateComingSoon(input: $input) {
    comingSoon
  }
}
    `;
function useUpdateComingSoonMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(UpdateComingSoonDocument);
}
const UpdateVisibilityDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation UpdateVisibility($input: UpdateVisibleInput!) {
  updateVisibility(input: $input) {
    visible
  }
}
    `;
function useUpdateVisibilityMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(UpdateVisibilityDocument);
}
const LocationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query Location($yextId: String!) {
  location(yextId: $yextId) {
    ...LocationSnippet
  }
}
    ${LocationSnippetFragmentDoc}`;
function useLocationQuery(options) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: LocationDocument,
        ...options
    });
}
const LocationsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query Locations {
  locations {
    ...LocationSnippet
  }
}
    ${LocationSnippetFragmentDoc}`;
function useLocationsQuery(options) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: LocationsDocument,
        ...options
    });
}


/***/ }),

/***/ 4711:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ createUrqlClient)
/* harmony export */ });
/* unused harmony export errorExchange */
/* harmony import */ var _urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9352);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var wonka__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__, wonka__WEBPACK_IMPORTED_MODULE_3__]);
([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__, wonka__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




// Global error handling
const errorExchange = ({ forward  })=>{
    return (ops$)=>{
        return (0,wonka__WEBPACK_IMPORTED_MODULE_3__.pipe)(forward(ops$), (0,wonka__WEBPACK_IMPORTED_MODULE_3__.tap)(({ error  })=>{
            // If the OperationResult has an error send a request to sentry
            if (error) {
                // the error is a CombinedError with networkError and graphqlErrors properties
                if (error === null || error === void 0 ? void 0 : error.message.includes("not authenticated")) {
                    next_router__WEBPACK_IMPORTED_MODULE_1___default().replace("/login");
                }
            }
        }));
    };
};
const cursorPagination = ()=>{
    return (_parent, fieldArgs, cache, info1)=>{
        const { parentKey: entityKey , fieldName  } = info1;
        const allFields = cache.inspectFields(entityKey); // Get all queries in the cache
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_2__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolve(entityKey, fieldKey), "posts");
        info1.partial = !isItInTheCache;
        let hasMore = true;
        const results = [];
        fieldInfos.forEach((fi)=>{
            // const key = cache.resolve(entityKey, fi.fieldKey) as string;
            // const data = cache.resolve(key, "posts") as string[];
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, "posts");
            const _hasMore = cache.resolve(key, "hasMore");
            if (!_hasMore) {
                hasMore = _hasMore;
            }
            results.push(...data);
        });
        return {
            posts: results,
            hasMore,
            __typename: "PaginatedPosts"
        };
    };
};
const createUrqlClient = (ssrExchange, ctx)=>{
    // Pass logged in users cookie to graphql for ssr requests so we know
    // their status.
    let cookie = '';
    return {
        url: "http://localhost:4000/graphql",
        fetchOptions: {
            credentials: "include",
            headers: cookie ? {
                cookie
            } : undefined
        },
        exchanges: [
            urql__WEBPACK_IMPORTED_MODULE_2__.dedupExchange,
            (0,_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__.cacheExchange)({
                keys: {
                    PaginatedPosts: ()=>null
                },
                resolvers: {
                    Query: {
                        posts: cursorPagination()
                    }
                }
            }),
            errorExchange,
            ssrExchange,
            urql__WEBPACK_IMPORTED_MODULE_2__.fetchExchange, 
        ]
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;