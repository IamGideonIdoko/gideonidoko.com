/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Link from 'next/link';
// import { getReadTime } from '../../helper';
import styles from '../../styles/Home.module.css';
import { Post } from '../../interfaces/post.interface';
import { useState, useEffect } from 'react';
import { authGet } from '../../helper';

const SectionFive = ({}) => {
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        (async () => {
            const customEvent = new CustomEvent('sectionFiveDone', {
                detail: { message: 'This is a custom event from section five!' },
            });
            try {
                const res = await authGet(`/posts?per_page=3`);
                setPosts(res?.data?.posts?.docs || []);
            } catch (err) {
                console.error('Err => ', err);
            } finally {
                window.document.dispatchEvent(customEvent);
            }
        })();
    }, []);

    return (
        <div className={`${styles.sectionFive} section-five`}>
            <div className="container-full">
                <div className={styles.sectionFiveWrapper}>
                    <h3 className={styles.servicesHead}>— Articles —</h3>

                    <p className={styles.sec5Intro}>
                        I also <b>write</b> ✍🏽. Here&apos;re the latest on my blog:
                    </p>

                    <div className={styles.s5PostWrapper}>
                        {posts.map((post) => (
                            <article key={post._id}>
                                <Link href={`/blog/${post.slug}`} className={styles.s5PostHref}>
                                    <div className={styles.s5PostFlex}>
                                        <div className={styles.s5PostImg}>
                                            <img src={post.cover_img} alt={`${post.title} cover image`} />
                                        </div>
                                        <div className={styles.s5PostInfo}>
                                            <h3>{post.title}</h3>
                                            <div>
                                                <span>
                                                    <small>{moment(post.created_at).format('MMM DD, YYYY')}</small>
                                                </span>
                                                {post?.read_time && (
                                                    <>
                                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                                        <span>
                                                            <small>{post?.read_time}</small>
                                                        </span>
                                                    </>
                                                )}
                                                &nbsp;&nbsp;|&nbsp;&nbsp;{' '}
                                                <span>
                                                    <small>{post.author_name}</small>
                                                </span>
                                            </div>
                                            <p className={styles.postShortExcerpt}>
                                                {/* {post?.description?.substr(0, 196)} */}
                                                {post?.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div>
                        <div className={styles.sec5SeeMore}>
                            <Link
                                href="/blog"
                                className={`animated-button animated-button--pallene__outline ${styles.aboutSeeMore}`}
                            >
                                Check out my blog.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionFive;
