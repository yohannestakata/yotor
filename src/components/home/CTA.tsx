import CTACard from "../ui/CTACard";

export default function CTA() {
  return (
    <section className="py-16 ">
      <div className="px-16  grid grid-cols-12 gap-6">
        <CTACard
          bgUrl="https://plus.unsplash.com/premium_photo-1669850858863-6fe7bf233483?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
          title="Men"
          href="/men"
        />
        <CTACard
          bgUrl="https://plus.unsplash.com/premium_photo-1689575249162-beed0ac1f015?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBmYXNoaW9ufGVufDB8MHwwfHx8MA%3D%3D"
          title="Women"
          href="/women"
        />
        <CTACard
          bgUrl="https://images.unsplash.com/photo-1598211664451-1458e4a3e279?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww"
          title="Kids"
          href="/kids"
        />
      </div>
    </section>
  );
}
