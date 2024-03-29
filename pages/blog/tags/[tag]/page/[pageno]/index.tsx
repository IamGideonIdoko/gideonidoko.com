import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AllPostsRender from '../../../../../../components/blog/AllPostsRender';
import styles from '../../../../../../styles/Blog.module.css';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { authGet } from '../../../../../../helper';
import { PaginatedPosts } from '../../../../../../interfaces/post.interface';
import Custom404 from '../../../../../404';

const Tags = ({ posts }: { posts: PaginatedPosts }) => {
    const router = useRouter();
    const { tag } = router.query;
    const { pageno } = router.query;
    const currentPageNumber = Number(pageno);

    return (
        <Fragment>
            {posts?.docs?.length === 0 ? (
                <Custom404 />
            ) : (
                <Fragment>
                    <NextSeo
                        title={`Blog posts with the tag "${tag}" (Page ${currentPageNumber}) - Gideon Idoko`}
                        description={`Check out posts with the tag "${tag}" on this blog where Gideon Idoko writes about software engineering topics, tips, tricks, and tools.`}
                        canonical={`https://gideonidoko.com/blog/tags/${tag}/${currentPageNumber}`}
                        openGraph={{
                            url: `https://gideonidoko.com/blog/tags/${tag}/${currentPageNumber}`,
                            title: `Blog posts with the tag "${tag}" (Page ${currentPageNumber}) - Gideon Idoko`,
                            description: `Check out posts with the tag "${tag}" on this blog where Gideon Idoko writes about software engineering topics, tips, tricks, and tools.`,
                            images: [
                                {
                                    url: 'https://gideonidoko.com/GideonIdokoCardImage.png',
                                    width: 1500,
                                    height: 500,
                                    alt: "Gideon Idoko's card image",
                                },
                            ],
                            site_name: 'Blog - Gideon Idoko',
                        }}
                        twitter={{
                            handle: '@IamGideonIdoko',
                            site: '@IamGideonIdoko',
                            cardType: 'summary_large_image',
                        }}
                    />
                    <main className={`padding-top-10rem ${styles.blogMain}`}>
                        <div className="container-max-1248px">
                            <Fragment>
                                <h2 style={{ marginBottom: '4rem' }}>
                                    #{tag} &nbsp;{' '}
                                    <small>
                                        (
                                        {posts?.totalDocs <= 1
                                            ? `${posts?.totalDocs} post`
                                            : `${posts?.totalDocs} posts`}
                                        )
                                    </small>{' '}
                                </h2>

                                <AllPostsRender posts={posts?.docs} />

                                <div className={styles.paginationWrapper}>
                                    <div className={styles.pagination}>
                                        <span>
                                            {posts?.hasPrevPage && (
                                                <Link
                                                    href={`/blog/tags/${tag}${
                                                        Number(posts?.page) === 2
                                                            ? ''
                                                            : `/page/${Number(posts?.page) - 1}`
                                                    }`}
                                                >
                                                    ← Previous Page
                                                </Link>
                                            )}
                                        </span>
                                        <span>
                                            {posts?.hasNextPage && (
                                                <Link href={`/blog/tags/${tag}/page/${Number(posts?.page) + 1}`}>
                                                    Next Page →
                                                </Link>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Fragment>
                        </div>
                    </main>
                </Fragment>
            )}
        </Fragment>
    );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    const tag = context.params?.tag;
    const pageno = context.params?.pageno;

    // check is the value of pageno is a wrong input
    if (!Number.isInteger(Number(pageno)) || Number(pageno) < 1) return { props: { posts: { docs: [] } } };

    // Fetch data from external API
    try {
        const res = await authGet(`/posts/${tag}?per_page=10&page=${pageno}`);
        if (res?.data?.posts?.docs?.length === 0) return { notFound: true };
        return { props: { posts: res?.data?.posts } };
    } catch (err) {
        // return { props: { posts: { docs: [] } } };
        return { notFound: true };
    }
};

export default Tags;
