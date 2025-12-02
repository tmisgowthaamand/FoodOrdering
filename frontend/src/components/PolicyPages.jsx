import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

const PolicyLayout = ({ title, children, onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-6 flex items-center gap-2 hover:bg-gray-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Button>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b">{title}</h1>
                    <div className="prose prose-purple max-w-none text-gray-700 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PrivacyPolicy = ({ onBack }) => (
    <PolicyLayout title="Privacy Policy" onBack={onBack}>
        <p>At Foodeo, your privacy is our priority. Whether you purchase our products online, place orders, or connect with us for inquiries, we are committed to protecting the personal information you share with us. We ensure that your data is handled with transparency, care, and compliance with applicable Indian IT laws and globally recognized data protection standards.</p>

        <p>This Privacy Policy explains the type of information we collect, how we use it, the measures we take to protect it, and your rights as our customer.</p>

        <h3>Information We Collect</h3>
        <p>When you interact with us, we may collect the following:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Full Name / Business Name</li>
            <li>Email Address & Phone Number</li>
            <li>Billing & Shipping Address</li>
            <li>Order & Transaction Details</li>
            <li>Payment Information (processed via secure third-party gateways)</li>
            <li>Device & Browser Information (for website visits)</li>
            <li>Cookies & Analytics Data (to improve site performance)</li>
        </ul>
        <p>We only collect information necessary for smooth operations, order fulfillment, and customer support.</p>

        <h3>How We Use Your Information</h3>
        <p>We use your data solely for:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Processing and fulfilling customer orders</li>
            <li>Coordinating delivery and logistics</li>
            <li>Providing after-sales support and resolving queries</li>
            <li>Sending updates, promotions, or offers (only if you opt in)</li>
            <li>Ensuring compliance with taxation and legal requirements</li>
            <li>Improving website experience and product offerings</li>
        </ul>

        <h3>How We Protect Your Information</h3>
        <p>We implement strong safeguards to ensure your data remains secure:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>SSL Encryption:</strong> All online transactions are encrypted.</li>
            <li><strong>Secure Payments:</strong> We never store sensitive payment details; transactions are processed via trusted third-party providers.</li>
            <li><strong>Access Controls:</strong> Only authorized personnel can access sensitive information.</li>
            <li><strong>Regular Reviews:</strong> Security protocols and systems are updated regularly to prevent misuse.</li>
        </ul>

        <h3>Your Rights</h3>
        <p>As our customer, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Request access to the information we hold about you</li>
            <li>Ask for corrections or updates to your data</li>
            <li>Request deletion of your personal data (where legally permissible)</li>
            <li>Withdraw consent from promotional communications</li>
            <li>Raise privacy-related concerns at any time</li>
        </ul>
        <p>We respond to such requests within 30 business days.</p>

        <h3>Third-Party Sharing</h3>
        <p>Your data is never sold. It is shared only with:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Logistics partners (for delivery of orders)</li>
            <li>Payment gateways (for secure processing)</li>
            <li>Regulatory authorities (if legally required)</li>
        </ul>

        <h3>Policy Updates</h3>
        <p>We may update this Privacy Policy periodically to reflect business, legal, or technological changes. The most recent version will always be available on our website with the updated date.</p>

        <h3>Contact Us</h3>
        <p>For privacy-related questions, requests, or complaints, please reach out to us:</p>
        <div className="mt-4">
            <p className="font-bold">Foodeo</p>
            <p>Chennai, India</p>
            <p>1800-123-4567</p>
            <p>support@foodeo.com</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">© 2025 Foodeo. All Rights Reserved.</p>
    </PolicyLayout>
);

export const TermsConditions = ({ onBack }) => (
    <PolicyLayout title="Terms & Conditions" onBack={onBack}>
        <p>Welcome to Foodeo. By accessing our website, placing an order, or purchasing our products, you agree to the following Terms & Conditions. These terms govern all transactions, product use, and services we provide.</p>
        <p>If you do not agree with any part of these terms, please discontinue use of our services.</p>

        <h3>1. General Use of the Website & Services</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>You confirm that you are at least 18 years of age or accessing the site under the supervision of a guardian.</li>
            <li>You agree to use our services only for lawful purposes and in ways that do not harm our reputation or restrict others from using the site.</li>
            <li>We reserve the right to decline or cancel orders if fraudulent activity, misuse, or violation of these terms is detected.</li>
        </ul>

        <h3>2. Products & Authenticity</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>We specialize in delivering fresh groceries and daily essentials. All products are sourced under strict quality standards.</li>
            <li>Product descriptions, packaging, and images are for representation only; natural variations may occur.</li>
            <li>Products are intended for personal, household, or wholesale business use only and must not be resold under false branding.</li>
        </ul>

        <h3>3. Pricing & Payments</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>All prices are listed in Indian Rupees (INR ₹) unless specified otherwise.</li>
            <li>Prices may change due to raw material availability, market fluctuations, or company policies.</li>
            <li>Payments must be made in full at the time of order.</li>
            <li>We accept UPI, credit/debit cards, net banking, and secure third-party payment gateways.</li>
        </ul>

        <h3>4. Shipping & Delivery</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Orders are dispatched within the processing time communicated during checkout.</li>
            <li>Delivery timelines depend on the destination, order size, and logistics partner availability.</li>
            <li>Customers must provide accurate shipping details. We are not liable for delivery delays caused by incorrect addresses or courier issues.</li>
            <li>Please refer to our Shipping Policy for detailed terms.</li>
        </ul>

        <h3>5. Returns & Refunds</h3>
        <p>Due to the consumable nature of grocery items, products cannot be returned once opened.</p>
        <p>Refunds or replacements are allowed only for:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Damaged or tampered packaging reported on delivery</li>
            <li>Wrong product supplied against the order</li>
        </ul>
        <p>Refunds are processed as per our Cancellation & Refund Policy.</p>

        <h3>6. Intellectual Property</h3>
        <p>All logos, product names, branding, packaging designs, and website content belong to Foodeo. Reproduction, distribution, or misuse without written permission is prohibited.</p>

        <h3>7. Limitation of Liability</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>We are not responsible for any health concerns arising from misuse, improper storage, or allergic reactions.</li>
            <li>Our products are stored under hygienic conditions, but customers are responsible for verifying suitability before consumption.</li>
            <li>Liability is strictly limited to the value of the product purchased.</li>
        </ul>

        <h3>8. Governing Law & Jurisdiction</h3>
        <p>These Terms & Conditions are governed by the laws of India, with jurisdiction under the courts of Chennai, Tamil Nadu.</p>

        <h3>9. Contact Us</h3>
        <p>For queries, concerns, or assistance, please reach out to us:</p>
        <div className="mt-4">
            <p className="font-bold">Foodeo</p>
            <p>Chennai, India</p>
            <p>1800-123-4567</p>
            <p>support@foodeo.com</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">© 2025 Foodeo. All Rights Reserved.</p>
    </PolicyLayout>
);

export const ShippingPolicy = ({ onBack }) => (
    <PolicyLayout title="Shipping & Delivery Policy" onBack={onBack}>
        <p>At Foodeo, we take every step to ensure that our products reach you in perfect condition—fresh, securely packed, and delivered on time.</p>

        <h3>1. Order Processing</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Orders are processed immediately for instant delivery.</li>
            <li>Bulk or wholesale orders may require additional preparation time. Customers will be informed in advance.</li>
            <li>Standard shipping orders are processed within 24 hours.</li>
        </ul>

        <h3>2. Delivery Coverage</h3>
        <p><strong>Hyperlocal Delivery</strong></p>
        <p>Chennai & select areas in Tamil Nadu: Delivered within minutes.</p>

        <p><strong>Domestic Shipping</strong></p>
        <p>We deliver non-perishable items across India via trusted courier partners.</p>

        <h3>3. Estimated Delivery Timelines</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Instant Delivery (Chennai):</strong> 10-45 minutes</li>
            <li><strong>Rest of India (Standard):</strong> 3-5 business days</li>
        </ul>
        <p>Note: Delivery times are estimates and may be affected by traffic, weather conditions, or regional restrictions.</p>

        <h3>4. Shipping Charges</h3>
        <p>Charges are calculated based on:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Order value and distance</li>
            <li>Delivery location</li>
        </ul>
        <p>Free Shipping: Offered for orders above a certain value (announced via promotions).</p>

        <h3>5. Packaging & Quality Assurance</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Products are packed in sealed, tamper-proof packaging.</li>
            <li>Fresh produce is handled with care to ensure quality.</li>
            <li>Bulk shipments are packed in corrugated boxes for safe transit.</li>
        </ul>

        <h3>6. Tracking & Updates</h3>
        <p>Once dispatched, customers will receive:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Live tracking for instant delivery orders via our app.</li>
            <li>A tracking number via email/SMS for standard shipping orders.</li>
        </ul>

        <h3>7. Delays & Exceptions</h3>
        <p>Delivery may be delayed due to:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Natural calamities or extreme weather</li>
            <li>Traffic conditions or operational backlogs</li>
            <li>Incorrect/incomplete address details provided by the customer</li>
        </ul>
        <p>We will notify customers promptly if significant delays occur.</p>

        <h3>Need Help With Shipping?</h3>
        <p>For questions or assistance regarding your shipment, contact:</p>
        <div className="mt-4">
            <p className="font-bold">Foodeo</p>
            <p>Chennai, India</p>
            <p>1800-123-4567</p>
            <p>support@foodeo.com</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">© 2025 Foodeo. All Rights Reserved.</p>
    </PolicyLayout>
);

export const RefundPolicy = ({ onBack }) => (
    <PolicyLayout title="Cancellation & Refund Policy" onBack={onBack}>
        <p>At Foodeo, we strive to provide high-quality groceries and daily essentials that reach our customers in perfect condition. Since our products are consumables, cancellations and refunds are subject to specific guidelines to maintain quality, hygiene, and customer satisfaction.</p>

        <h3>Order Cancellations</h3>
        <p><strong>Cancellation Window:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Orders may be cancelled before they are packed or dispatched.</li>
            <li>Once an order is packed or shipped, cancellations are not permitted due to the perishable and consumable nature of the products.</li>
            <li>For bulk/wholesale orders, cancellation terms will be specified in the quotation or purchase agreement.</li>
        </ul>

        <h3>Returns & Replacements</h3>
        <p>We only accept returns in the following cases:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Wrong product delivered against the order</li>
            <li>Damaged or tampered packaging upon delivery</li>
            <li>Quality defects reported immediately upon opening</li>
        </ul>
        <p><strong>Conditions:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Issues must be reported within 48 hours of delivery with supporting photos/videos.</li>
            <li>Products must remain in sealed, unused condition.</li>
            <li>Opened or partially used bottles/packets are not eligible for return.</li>
        </ul>

        <h3>Non-Returnable Products</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Opened, used, or tampered products</li>
            <li>Products damaged due to improper storage after delivery</li>
            <li>Delays caused by courier or external factors beyond our control</li>
        </ul>

        <h3>Refunds</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Approved refunds will be initiated within 5–7 business days of confirmation.</li>
            <li>Refunds will be processed via the original payment method (UPI, card, net banking, etc.).</li>
            <li>Depending on your bank or provider, funds may take 7–10 business days to reflect.</li>
            <li>Customers may opt for a replacement product or store credit instead of a refund.</li>
        </ul>

        <h3>Need Help?</h3>
        <p>For assistance regarding cancellations or refunds, please contact:</p>
        <div className="mt-4">
            <p className="font-bold">Foodeo</p>
            <p>Chennai, India</p>
            <p>1800-123-4567</p>
            <p>support@foodeo.com</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">© 2025 Foodeo. All Rights Reserved.</p>
    </PolicyLayout>
);
