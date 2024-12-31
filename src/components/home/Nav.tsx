import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Nav() {
  return (
    <nav className="relative mt-8 flex justify-between px-16">
      <ul className="flex gap-6">
        <li>
          <Link href="/collections/men">Men</Link>
        </li>
        <li>
          <Link href="/collections/women">Women</Link>
        </li>
        <li>
          <Link href="/collections/kids">Kids</Link>
        </li>
        <li>
          <Link href="/collections/new">New &amp; Featured</Link>
        </li>
      </ul>
      <div className="flex gap-6">
        <Sheet>
          <SheetTrigger>
            <ShoppingCart />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Link href="/login">Login</Link>
      </div>
      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
      >
        <h1>Yotor</h1>
      </Link>
    </nav>
  );
}
