
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import FrequencyForm from '@/components/FrequencyForm';

const AddFrequency = () => {
  return (
    <Layout>
      <div className="pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Add New Frequency
            </motion.h1>
            <motion.p 
              className="mt-3 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Contribute to our frequency collection by adding a new vibrational frequency
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FrequencyForm />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddFrequency;
