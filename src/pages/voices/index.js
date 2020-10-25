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
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.articles);
  const [articleTypes, setArticleTypes] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    tags: []
  });
  getPreviewData(getArticles, setData, setPreview, false);

  /**
   * Add or remove a filter from activeFilters
   */
  const addOrRemoveFilter = (filterName, type) => {
    const exists = activeFilters[type].includes(filterName);
    if (exists) {
      if (type === 'tags') {
        const newArr = activeFilters.tags.filter((c) => {return c !== filterName});
        setActiveFilters({types: activeFilters.types, tags: newArr});
      } else {
        const newArr = activeFilters.types.filter((c) => {return c !== filterName});
        setActiveFilters({types: newArr, tags: activeFilters.tags});
      }
    } else {
      if (type === 'tags') {
        const newArr = activeFilters.tags;
        newArr.push(filterName);
        setActiveFilters({types: activeFilters.types, tags: newArr});
      } else {
        const newArr = activeFilters.types;
        newArr.push(filterName);
        setActiveFilters({types: newArr, tags: activeFilters.tags});
      }
    }
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
  }, []);
  return (
    <Layout preview={preview}>
      <article className={`Voices ph3 w-100`}>
        <section className="Voices__container Container mv3 mv4-lg">
          <h3 className="body-header">Filters</h3>
          <ul className="Voices__filters flex flex-wrap mt3">
            {articleTypes.map((item, index) => {
              return (
                <li className="Voices__filter" key={index}>
                  <button
                    className={classnames('Voices__filter-button dib mr3 pa2', {
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
          <ul className="Voices__filters flex flex-wrap mt3">
            {articleTags.map((item, index) => {
              return (
                <li className="Voices__filter" key={index}>
                  <button
                    className={classnames('Voices__filter-button dib mr3 pa2', {
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
