# Yotor

Yotor is a casual wear e-commerce platform tailored for young adults. Built with React and Supabase, Yotor offers a seamless shopping experience with essential features like filters, order management, and payment on delivery.

## Features

- **User-friendly Shopping Experience**: Explore a range of casual wear with simple navigation and filtering options.
- **Advanced Filters**: Sort products by category, price range, size, and color.
- **Authentication**: Secure user authentication powered by Supabase.
- **Admin Dashboard**:
  - Manage orders and track inventory.
  - Add or remove products easily.
- **Payment on Delivery**: Hassle-free transactions without the need for online payment.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase
- **Deployment**: Netlify
- **Authentication**: Supabase Auth

## Installation

Follow these steps to set up Yotor locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yohannestakata/yotor.git
   cd yotor
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

     ```

4. Start the development server:
   ```bash
   bun run dev
   ```

5. Access the app at `http://localhost:3000`.

## Deployment

The app is deployed on [Netlify](https://yotor-style.netlify.app/). You can check out the live version [here](#).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is open-source and available under the MIT License.
