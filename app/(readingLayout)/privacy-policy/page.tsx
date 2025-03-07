import { FC } from "react";
import { AnimatedHeading, Heading2, Heading3 } from "@components/text";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";
import { PrettyLink } from "@/components/pretty-link";

const JustText: FC<BasicUiComponent> = ({ children, className }) => (
  <span className={cn("mt-4 text-justify leading-8 tracking-wider", className)}>{children}</span>
);

const PrivacyPolicyPage: FC = () => (
  <div className="m-auto max-w-sm antialiased md:max-w-5xl">
    <section className="relative mx-auto mt-20 max-w-4xl px-4 md:mt-40 md:px-2">
      <AnimatedHeading>Privacy Policy</AnimatedHeading>
      <JustText>
        <strong>Last Updated: </strong> March 5, 2025
        <br />
        <br />
        Thank you for visiting https://tusharshukla.dev. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are
        committed to protecting your privacy and ensuring that your personal information is handled responsibly. This
        Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. By using
        our website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in
        this policy, please do not use our website. use.
      </JustText>
      <Heading2 className="mb-2 mt-12">1. Information We Collect</Heading2>
      <Heading3>a. Automatically Collected Information</Heading3>
      <JustText>
        When you visit our website, we automatically collect certain information about your device and browsing
        activity, including:
      </JustText>
      <ul>
        <li>
          <strong>IP Address:</strong> Your IP address is used to help identify your location and prevent abuse.
        </li>
        <li>
          <strong>Browser and Device Information:</strong> This includes your browser type, operating system, screen
          resolution, and other technical details.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information about how you interact with our website, such as the visit
          and the time spent on each page.
        </li>
      </ul>
      <Heading3>b. View Count Tracking</Heading3>
      <JustText>
        To provide accurate blog view counts, we use a combination of:
        <ul>
          <li>
            <strong>IP Address:</strong> To identify unique users across devices on the same network.
          </li>
          <li>
            <strong>Browser Fingerprinting:</strong> A combination of your browser type, screen resolution, and other
            non-personal attributes to create a unique identifier.
          </li>
        </ul>
        This information is stored securely in{" "}
        <PrettyLink href="https://upstash.com/" title="Redis Upstash">
          Redis Upstash
        </PrettyLink>{" "}
        and is used solely for tracking view counts. It is not linked to any personally identifiable information (PII).
      </JustText>
      <Heading2 className="mb-2 mt-12">2. How We Use Your Information</Heading2>
      We use the information we collect for the following purposes:
      <ul>
        <li>
          <strong>View Count Tracking:</strong> To accurately track and display the number of views for each blog post.
        </li>
        <li>
          <strong>Website Analytics:</strong> To understand how users interact with our website and improve its
          performance.
        </li>
        <li>
          <strong>Security:</strong> To detect and prevent fraudulent or abusive activity.
        </li>
      </ul>
      <Heading2 className="mb-2 mt-12">3. Data Storage and Retention</Heading2>
      <ul>
        <li>
          <strong>Redis Upstash:</strong> All view count data is stored securely in Redis Upstash, a cloud-based
          database service. Data is retained for as long as necessary to provide accurate view counts and is
          automatically deleted after 24 hours for individual user tracking.
        </li>
        <li>
          <strong>No Personal Data:</strong> We do not store personally identifiable information (PII) such as names,
          email addresses, or phone numbers.
        </li>
      </ul>
      <Heading2 className="mb-2 mt-12">4. Cookies and Tracking Technologies</Heading2>
      <JustText>
        We do not use cookies or other tracking technologies to collect personal information. However, we use browser
        fingerprinting (a combination of non-personal attributes) to uniquely identify users for view count tracking.
      </JustText>
      <Heading2 className="mb-2 mt-12">5. Third-Party Services</Heading2>
      <JustText>We use the following third-party services:</JustText>
      <ul>
        <li>
          <strong>Redis Upstash:</strong> To store and manage view count data securely.
        </li>
        <li>
          <strong>Vercel:</strong> To host our website and provide serverless functions.
        </li>
      </ul>
      <JustText>
        These services are compliant with industry-standard data protection regulations and do not have access to your
        personal information.
      </JustText>
      <Heading2 className="mb-2 mt-12">6. Your Rights</Heading2>
      <JustText>Under applicable data protection laws, you have the following rights:</JustText>
      <ul>
        <li>
          <strong>Access:</strong> You can request information about the data we collect and how it is used.
        </li>
        <li>
          <strong>Correction:</strong> You can request corrections to any inaccurate data.
        </li>
        <li>
          <strong>Deletion:</strong> You can request the deletion of your data, subject to legal obligations.
        </li>
      </ul>
      <JustText>To exercise these rights, please contact us at [your email address].</JustText>
      <Heading2 className="mb-2 mt-12">7. Changes to This Privacy Policy</Heading2>
      <JustText>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
        &ldquot;Last Updated&rdquot; date. We encourage you to review this policy periodically to stay informed about
        how we are protecting your information.
      </JustText>
    </section>
  </div>
);

export default PrivacyPolicyPage;
