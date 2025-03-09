import React from 'react';
import { Stack, Text } from '@fluentui/react';

const FluentMainContent: React.FC = () => {
    return (
        <Stack 
            styles={{ root: { padding: '20px' } }} 
            tokens={{ childrenGap: 20 }}
        >
            <Text variant="xxLarge">Welcome to the Fluent UI React App</Text>
            <Text variant="large">This is the main content area.</Text>
            <Text variant="medium">Here you can display the primary content of the selected page.</Text>
        </Stack>
    );
};

export default FluentMainContent;