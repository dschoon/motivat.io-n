import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Layout, ReactReveal } from '../components/common';
import { MetaData } from '../components/common/meta';

import '../assets/styles/fontawesome-all.min.css';

const revealConfig = {
    width: '100%',
    height: '100%',
    margin: 0,
    controls: true,
    progress: true,
    slideNumber: false,
    history: true,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: true,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoSlide: 0,
    autoSlideStoppable: true,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    viewDistance: 1,
    parallaxBackgroundImage: '',
    parallaxBackgroundSize: '',
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,
    display: 'block',
};

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;
    const sections = posts.map(({ node }) => {
        return {
            name: node.title,
            markup: `<section data-background-image="${node.feature_image}" data-background-opacity=".4"><div class="slide-body">${node.html}</div></div></section>`
        }
    });

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <ReactReveal
                    sections={sections}
                    reveal={revealConfig}
                />
            </Layout>
        </>
    )
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
