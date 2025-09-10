import plotly.graph_objects as go
import plotly.express as px
import pandas as pd

# Create comprehensive data for all platforms and their unique features
data = {
    'Platform': ['TWIPLA'] * 4 + ['Google Analytics'] * 4 + ['Wix Analytics'] * 2,
    'Feature': [
        'Session Rec', 'Rage Clicks', 'Company ID', 'Outgoing',
        'Custom Dims', 'Audience Seg', 'Attribution', 'Cross-Platform', 
        'Zero Setup', 'Integrated'
    ],
    'Impact_Value': [23, 31, 15, 20, 35, 28, 40, 45, 10, 25],
    'Impact_Type': [
        'Conv Drop Fix', 'Satisfaction', 'Lead Convert', 'Partnership',
        'Custom Track', 'Ad Targeting', 'Journey Map', 'Unified View',
        'Hours Saved', 'Quick Decide'
    ],
    'Full_Description': [
        'Identify UX issues causing conversion drops',
        'Fix broken elements, boost satisfaction', 
        'Convert anonymous visitors to leads',
        'Optimize referral partnerships',
        'Track business-specific metrics',
        'Create precise user segments for ads',
        'See full customer journey impact',
        'Connect website, app, offline data',
        'Save 10+ hours setup time',
        'Quick decisions without switching'
    ]
}

df = pd.DataFrame(data)

# Create grouped bar chart
fig = go.Figure()

# Define platform colors
platform_colors = {
    'TWIPLA': '#1FB8CD',
    'Google Analytics': '#DB4545', 
    'Wix Analytics': '#2E8B57'
}

# Group data by platform
platforms = ['TWIPLA', 'Google Analytics', 'Wix Analytics']

for platform in platforms:
    platform_data = df[df['Platform'] == platform]
    
    # Create text labels based on impact type
    text_labels = []
    for i, row in platform_data.iterrows():
        if 'Hours' in row['Impact_Type']:
            text_labels.append(f"{row['Impact_Value']}h")
        else:
            text_labels.append(f"{row['Impact_Value']}%")
    
    fig.add_trace(go.Bar(
        name=platform,
        x=platform_data['Feature'],
        y=platform_data['Impact_Value'],
        marker_color=platform_colors[platform],
        text=text_labels,
        textposition='outside',
        hovertemplate="<b>%{x}</b><br>" +
                     f"Platform: {platform}<br>" +
                     "Impact: %{text}<br>" +
                     "%{customdata}<br>" +
                     "<extra></extra>",
        customdata=platform_data['Full_Description']
    ))

# Update layout
fig.update_layout(
    title="What You're Missing: Advanced Features",
    xaxis_title="Platform Features",
    yaxis_title="Business Impact",
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(tickangle=45, tickfont=dict(size=10))
fig.update_yaxes(range=[0, 50])

# Add cliponaxis
fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("missing_features_impact.png")