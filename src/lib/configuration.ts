/**
 * Configuration for Hono Blog Template
 */
export interface HonoBlogOptions {
  /**
   * Name of Blog , for `<title>{ BlogName | name of pages will here }</title>`
   */
  siteName?: string;
  /**
   * The URL of blog, after deployed
   */
  siteUrl?: string;
  /**
   * The directory that contain all of source file of blog.
   *
   * @example
   *
   * must be like - "app" , not "./app"
   */
  baseDir?: string;
  /**
   * Files or Directories want to ignore 
   */
  ignore?: string[];
  /**
   * Common html meta tags
   */
  meta?: {
    /**
     * The name of the document's author
     */
    author?: string;
    /**
     * A short and accurate summary of the content of the page.
     */
    description?: string;
    /**
     * The identifier of the software that generated the page, if true generator name will `Hono`
     */
    generator?: boolean;
    keywords?: string[];
    favicon?: string;
    /**
     *  The title of the object as it should appear within the graph
     */
    ogTitle?: string;
    /**
     * The type of the object
     */
    ogType?: string;
    /**
     *  An image URL which should represent the object within the graph.
     */
    ogImage?: string;
    /**
     * The canonical URL of your object that will be used as its permanent ID in the graph
     */
    ogUrl?: string;
  };
  /**
   * Social profile links
   */
  socialLink?: {
    facebook?: string;
    github?: string;
    twitter?: string;
    discord?: string;
    linkedin?: string;
    mastodon?: string;
  };
}
