import ProductCard from "../ui/ProductCard";

export default function NewCollections() {
  return (
    <section className="py-16">
      <h2 className="text-center text-5xl">New Collections</h2>
      <p className="mx-auto mt-4 w-1/2 text-center text-muted-foreground">
        Our latest collection, where classic and contemporary styles converge in
        perfect harmony
      </p>
      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-6 px-16">
        <ProductCard
          title="Classic Crewneck T-Shirt"
          description="A comfortable, 100% cotton crewneck t-shirt "
          price={350}
          src="https://images.unsplash.com/photo-1523914088562-e94af834794e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Slim Fit Denim Jeans"
          description="Made with a stretchable cotton blend "
          price={1200}
          src="https://images.unsplash.com/photo-1713880442898-0f151fba5e16?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Hooded Sweatshirt"
          description="Cozy  with kangaroo pockets and a drawstring hood"
          price={850}
          src="https://images.unsplash.com/photo-1523914088562-e94af834794e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Wrap Dress"
          description="Elegant yet casual wrap dress"
          price={1500}
          src="https://images.unsplash.com/photo-1523914088562-e94af834794e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Canvas Sneakers"
          description="Durable, lightweight sneakers "
          price={950}
          src="https://images.unsplash.com/photo-1523914088562-e94af834794e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <ProductCard
          title="Casual Chino Pants"
          description="Lightweight, versatile for a polished yet relaxed look"
          price={1000}
          src="https://images.unsplash.com/photo-1523914088562-e94af834794e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </section>
  );
}
