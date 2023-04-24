import Header from "@/components/Header"
import Form from "@/components/Form"
import CollectionFeed from "@/components/collections/CollectionFeed"

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <CollectionFeed />
    </>
  )
}
