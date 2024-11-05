import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutSection() {
  return (
    <section className="mb-12" id="about">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">About Us</h2>
      <Card>
        <CardHeader>
          <CardTitle>Cool Store: Your One-Stop Shop for Awesome Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            At Cool Store, we&apos;re passionate about bringing you the latest and greatest products
            from around the world. Our curated selection ensures that you&apos;ll always find something
            unique and exciting. With our commitment to quality and customer satisfaction, shopping
            with us is always a breeze!
          </p>
        </CardContent>
      </Card>
    </section>
  )
}