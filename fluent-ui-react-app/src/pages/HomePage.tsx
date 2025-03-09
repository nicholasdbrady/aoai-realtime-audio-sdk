import React from 'react';
import { Stack, Text, PrimaryButton } from '@fluentui/react';

const HomePage: React.FC = () => {
    return (
        <Stack 
            horizontalAlign="center" 
            verticalAlign="center" 
            styles={{ root: { height: '100vh', padding: '20px' } }}
        >
            <Text variant="xxLarge" styles={{ root: { marginBottom: '20px' } }}>
                Welcome to the Fluent UI React App!
            </Text>
            <Text variant="large" styles={{ root: { marginBottom: '40px' } }}>
                Explore the features and components of Fluent UI.
            </Text>
            <PrimaryButton text="Get Started" onClick={() => alert('Getting Started!')} />
        </Stack>
    );
};

export default HomePage;