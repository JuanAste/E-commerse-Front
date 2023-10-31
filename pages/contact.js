import About from "@/components/About";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ContactUs from "@/components/contactUs/ContactUs";

export default function Contact() {
  return (
    <About>
      <Header />
      <Center>
        <ContactUs />
      </Center>
    </About>
  );
}
