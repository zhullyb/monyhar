/* Whether the browser is Monyhar-based with MojoJS enabled */
export const isMonyharBased = 'MojoInterfaceInterceptor' in self;

/* Whether the browser is WebKit-based with internal test-only API enabled */
export const isWebKitBased = !isMonyharBased && 'internals' in self;
