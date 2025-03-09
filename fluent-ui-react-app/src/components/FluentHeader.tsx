import React from 'react';
import { 
    Toolbar, 
    Title1,
    Image
} from '@fluentui/react-components';

const FluentHeader: React.FC = () => {
    return (
        <div style={{ 
            backgroundColor: '#f0f0f0', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            position: 'sticky', 
            top: 0, 
            zIndex: 100 
        }}>
            <Toolbar>
                <Image 
                    src="/Azure-OpenAI.svg" 
                    alt="Azure OpenAI Logo" 
                    style={{ height: '32px', width: '32px', marginRight: '12px' }} 
                />
                <Title1 as="h1" style={{ flexGrow: 1 }}>
                    Real-time Audio Chat
                </Title1>
            </Toolbar>
        </div>
    );
};

export default FluentHeader;