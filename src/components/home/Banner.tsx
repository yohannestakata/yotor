export default function Banner() {
  return (
    <div className="mb-16 px-16">
      <div
        className="aspect-banner mt-8 w-full rounded-3xl bg-primary bg-cover bg-center"
        style={{
          backgroundImage: `
                    linear-gradient(
                      rgba(0, 0, 0, 0.3),
                      rgba(0, 0, 0, 0.3)
                    ),
                    url(https://images.unsplash.com/photo-1478803431644-b832801eefa7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className="flex h-full w-full flex-col justify-end gap-6 p-12">
          <h2 className="w-1/2 text-6xl capitalize text-background">
            Yotor Summer Collection
          </h2>
          <div className="flex items-end justify-between">
            <p className="w-1/2 text-background">
              Find out the best summer collection. Offering our best quality
              product in a Yotor Summer Collection.
            </p>
            <a
              href=""
              className="rounded-full bg-background px-8 py-2 font-semibold leading-none"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
