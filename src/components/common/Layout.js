import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Navigation } from '.';
import config from '../../utils/siteConfig';

// Styles
import '../../styles/app.css';

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = `https://twitter.com/motivat_io_n`;
    const instagramUrl = `https://www.instagram.com/motivat_io_n`;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <title>motivat.io/n</title>
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        }
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    {<a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer">
                                        <i className='fab fa-twitter' />
                                    </a>}
                                    {<a href={ instagramUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer">
                                        <i className='fab fa-instagram' />
                                    </a>}
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer">
                                        <i className='fas fa-rss' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <a href='https://schoonlabs.com' target='_blank'>SchoonLabs</a>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    )
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "favicon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
