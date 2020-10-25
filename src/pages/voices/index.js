import { useState, useEffect } from 'react';
// The data
import { getArticles } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Link from 'next/link';
import Layout from 'components/Layout';
import FeaturedArticles from 'components/modules/FeaturedArticles';

export default function Voices(context) {
  /**
   * All states
   */
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.articles);
  const [articleTypes, setArticleTypes] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    tags: []
  });
  const [articlesByTypes, setArticlesByTypes] = useState({});

  /**
   * Get the preview data
   */
  getPreviewData(getArticles, setData, setPreview, false);

  /**
   * Add or remove a filter from activeFilters
   */
  const addOrRemoveFilter = (filterName, type) => {
    const exists = activeFilters[type].includes(filterName);
    const newObj = {};
    if (exists) {
      if (type === 'tags') {
        const newArr = activeFilters.tags.filter((c) => {return c !== filterName});
        newObj.types = activeFilters.types;
        newObj.tags = newArr;
      } else {
        const newArr = activeFilters.types.filter((c) => {return c !== filterName});
        newObj.types = newArr;
        newObj.tags = activeFilters.tags;
      }
    } else {
      if (type === 'tags') {
        const newArr = activeFilters.tags;
        newArr.push(filterName);
        newObj.types = activeFilters.types;
        newObj.tags = newArr;
      } else {
        const newArr = activeFilters.types;
        newArr.push(filterName);
        newObj.types = newArr;
        newObj.tags = activeFilters.tags;
      }
    }
    setFiltersActive(newObj.tags.length || newObj.types.length);
    setActiveFilters(newObj);
  }

  useEffect(() => {
    let allArticleTypes = [];
    let allArticleTags = [];
    /**
     * Create the type and tag filters arrays
     */
    data.forEach(item => {
      if (allArticleTypes.indexOf(item.fields.type[0]) === -1) {
        allArticleTypes.push(item.fields.type[0]);
      }
      if (item.fields.tags) {
        item.fields.tags.forEach(tag => {
          if (allArticleTags.indexOf(tag) === -1) {
            allArticleTags.push(tag);
          }
        });
      }
    });
    setArticleTypes([...new Set(allArticleTypes)]);
    setArticleTags([...new Set(allArticleTags)]);
    /**
     * Create articles by types object
     */
    const typesObj = {};
    allArticleTypes.forEach(item => {
      typesObj[item] = [];
      data.forEach(datum => {
        if (datum.fields.type[0] === item) {
          typesObj[item].push(datum);
        }
      });
    });
    let sortedKeys = Object.keys(typesObj).sort((keyA, keyB) => {
      return typesObj[keyB].length - typesObj[keyA].length;
    });
    let newObj = {};
    sortedKeys.forEach(key => {
      newObj[key] = typesObj[key];
    })
    setArticlesByTypes(newObj);
  }, []);
  return (
    <Layout preview={preview}>
      <article className={`Voices ph3 w-100`}>
        <h1 className="Voices__page-header mt3 mt5-lg">UF Voices</h1>
        <section className="Voices__container Container mv3 mv4-lg tr">
          <button
            className="body-header"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >Filters <span className={classnames("Voices__filter-chevron dib ml3", {active: showFilters})}>‹</span></button>
          <ul className={classnames("Voices__filters flex flex-wrap justify-end mt1", {
            active: showFilters
          })}>
            {articleTypes.map((item, index) => {
              return (
                <li className="Voices__filter" key={index}>
                  <button
                    className={classnames('Voices__filter-button dib mr3 mt3 pa2', {
                      active: activeFilters.types.indexOf(item) !== -1
                    })}
                    onClick={() => {
                      addOrRemoveFilter(item, 'types');
                    }}
                  >{item}</button>
                </li>
              )
            })}
          </ul>
          <ul className={classnames("Voices__filters flex flex-wrap justify-end mt1", {
            active: showFilters
          })}>
            {articleTags.map((item, index) => {
              return (
                <li className="Voices__filter" key={index}>
                  <button
                    className={classnames('Voices__filter-button dib mr3 mt3 pa2', {
                      active: activeFilters.tags.indexOf(item) !== -1
                    })}
                    onClick={() => {
                      addOrRemoveFilter(item, 'tags');
                    }}
                  >{item}</button>
                </li>
              )
            })}
          </ul>
        </section>
        {filtersActive ? (
          <section className="Voices__container Container mb4 mb6-lg">
            <div className="Voices__container-inner flex flex-wrap">
              {data.filter(item => {
                if (activeFilters.types.length || activeFilters.tags.length) {
                  let filterBool = false;
                  if (activeFilters.types.length) {
                    // check if any types from the item
                    // are in the activeFilters.types,
                    // return true if so
                    filterBool = activeFilters.types.indexOf(item.fields.type[0]) !== -1;
                  }
                  if (activeFilters.tags.length) {
                    // check if any tags from the item
                    // are in the activeFilters.tags,
                    // return true if so
                    let tags = item.fields.tags || [];
                    tags.forEach(tag => {
                      filterBool = filterBool || activeFilters.tags.indexOf(tag) !== -1;
                    });
                  }
                  return filterBool;
                } else {
                  return true;
                }
              }).map((item, index) => {
                return (
                  <Link as={`/voices/${item.fields.slug}`} href="/voices/[slug]" key={index}>
                    <a className="Voices__article-link flex w-100 w-third-lg  db">
                      <div className="Voices__article flex-grow-1 flex flex-column ma3 pa3">
                        {item.fields.image && (
                          <figure className="w-100 mb3 mb0-md mr0 mr3-md">
                            <img className="Voices__image db" src={`${item.fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                          </figure>
                        )}
                        <div className="w-100">
                          <h5 className="Voices__type mt2">{item.fields.type[0]}</h5>
                          <h3 className="Voices__title mt1">{item.fields.title}</h3>
                          {item.fields.author && (
                            <h5 className="Voices__author mt2">{item.fields.author}</h5>
                          )}
                          {item.fields.tags && (
                            <ul className="Voices__tags mt2">
                              {item.fields.tags.map((item, index) => {
                                return (<li className="Voices__tag dib mr1" key={index}>{item}</li>)
                                })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : (
          <section className="Voices__container Container mb4 mb6-lg">
            <div className="Voices__container-inner flex flex-wrap">
              <Link as={`/voices/${data[0].fields.slug}`} href="/voices/[slug]">
                <a className="Voices__article-link flex w-100 w-two-thirds-lg  db">
                  <div className="Voices__article Voices__article-featured flex-grow-1 flex flex-column ma3 pa3">
                    {data[0].fields.image && (
                      <figure className="w-100 mb3 mb0-md mr0 mr3-md">
                        <img className="Voices__image db" src={`${data[0].fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                      </figure>
                    )}
                    <div className="w-100">
                      <h5 className="Voices__type mt2">{data[0].fields.type[0]}</h5>
                      <h3 className="Voices__title mt1">{data[0].fields.title}</h3>
                      {data[0].fields.author && (
                        <h5 className="Voices__author mt2">{data[0].fields.author}</h5>
                      )}
                      {data[0].fields.tags && (
                        <ul className="Voices__tags mt2">
                          {data[0].fields.tags.map((item, index) => {
                            return (<li className="Voices__tag dib mr1" key={index}>{item}</li>)
                            })}
                        </ul>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
              <Link as={`/voices/${data[1].fields.slug}`} href="/voices/[slug]">
                <a className="Voices__article-link flex w-100 w-third-lg  db">
                  <div className="Voices__article Voices__article-featured flex-grow-1 flex flex-column ma3 pa3">
                    {data[1].fields.image && (
                      <figure className="w-100 mb3 mb0-md mr0 mr3-md">
                        <img className="Voices__image db" src={`${data[1].fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                      </figure>
                    )}
                    <div className="w-100">
                      <h5 className="Voices__type mt2">{data[1].fields.type[0]}</h5>
                      <h3 className="Voices__title mt1">{data[1].fields.title}</h3>
                      {data[1].fields.author && (
                        <h5 className="Voices__author mt2">{data[1].fields.author}</h5>
                      )}
                      {data[1].fields.tags && (
                        <ul className="Voices__tags mt2">
                          {data[1].fields.tags.map((item, index) => {
                            return (<li className="Voices__tag dib mr1" key={index}>{item}</li>)
                            })}
                        </ul>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            {Object.keys(articlesByTypes).map((type, index) => {
              return (
                <div className="mb3" key={index}>
                  <h3 className="body-header">{type}s</h3>
                  <div className="Voices__container-inner flex flex-wrap">
                    {articlesByTypes[type].map((item, index) => {
                      return (
                        <Link as={`/voices/${item.fields.slug}`} href="/voices/[slug]" key={index}>
                          <a className="Voices__article-link flex w-100 w-third-lg  db">
                            <div className="Voices__article flex-grow-1 flex flex-column ma3 pa3">
                              {item.fields.image && (
                                <figure className="w-100 mb3 mb0-md mr0 mr3-md">
                                  <img className="Voices__image db" src={`${item.fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                                </figure>
                              )}
                              <div className="w-100">
                                <h5 className="Voices__type mt2">{item.fields.type[0]}</h5>
                                <h3 className="Voices__title mt1">{item.fields.title}</h3>
                                {item.fields.author && (
                                  <h5 className="Voices__author mt2">{item.fields.author}</h5>
                                )}
                                {item.fields.tags && (
                                  <ul className="Voices__tags mt2">
                                    {item.fields.tags.map((item, index) => {
                                      return (<li className="Voices__tag dib mr1" key={index}>{item}</li>)
                                      })}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </a>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </section>
        )}
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const articles = await getArticles(false);
  return {
    props: {articles}
  }
}
