import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const reasons = [
    "We offer competitive interest rates on all our savings accounts.",
    "Our mobile app provides a seamless experience for managing your finances on the go.",
    "We have a team of financial experts ready to assist you with any questions or concerns.",
    "We operate with transparency and integrity, ensuring that our customers can trust us with their money.",
    "We provide a wide range of financial products and services to meet the diverse needs of our customers.",
    "Our customer support team is available 24/7 to assist you with any issues or inquiries."
];

export default function WhyChooseUs() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-w-7xl px-6 py-20 lg:py-30">
            <div className=" mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us</h2>
                    <p className="text-gray-600 mb-6">Discover the benefits of banking with us.</p>
                    <ul>
                        {reasons.map((reason, index) => (
                            <li
                                key={index}
                                className="flex items-start mb-4"
                            >
                                <CheckCircle className="text-green-500 mr-2 mt-1" />
                                <p className="text-gray-600">{reason}</p>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
            <div className="flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center">
                            <p className="text-3xl font-bold  text-emerald-700">10M+</p>
                            <p className="text-gray-600">Active Customers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold  text-emerald-700">450B+</p>
                            <p className="text-gray-600">Processed Yearly</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold  text-emerald-700">99.9%</p>
                            <p className="text-gray-600">Uptime</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-emerald-700">4.9/5</p>
                            <p className="text-gray-600">Customer Satisfaction</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}