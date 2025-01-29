import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/prisma/queries/posts";

export default async function Home() {
  const topPosts = await fetchTopPosts()
  return (
    <div className="flex justify-between gap-4">
      <div className="w-2/3">
        <h1 className="text-xl font-bold    ">Topic Posts</h1>
        <div className="mt-2">
          <PostList posts={topPosts} />
        </div>
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
  
    </div>


  );
}
