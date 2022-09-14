import noResult from "./no-result.vue";
// @ts-ignore
import createLoadingLikeDirective from "./create-loading-like-directive";

const noResultDirective = createLoadingLikeDirective(noResult);

export default noResultDirective;
