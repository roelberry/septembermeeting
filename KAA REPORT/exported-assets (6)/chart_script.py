import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

# Data from the provided JSON
features = [
    "Built-in Traffic", 
    "Search Query Data", 
    "Custom Events", 
    "Session Replays", 
    "User Demographics", 
    "Privacy-First", 
    "Marketing Attrib"
]

platforms = ["Wix Analytics", "Google Analytics", "TWIPLA"]

# Feature matrix data
matrix_data = {
    "Built-in Traffic": {"Wix": "full", "GA": "full", "TWIPLA": "full"},
    "Search Query Data": {"Wix": "full", "GA": "full", "TWIPLA": "full"},
    "Custom Events": {"Wix": "partial", "GA": "full", "TWIPLA": "full"},
    "Session Replays": {"Wix": "none", "GA": "none", "TWIPLA": "full"},
    "User Demographics": {"Wix": "partial", "GA": "full", "TWIPLA": "limited"},
    "Privacy-First": {"Wix": "partial", "GA": "limited", "TWIPLA": "full"},
    "Marketing Attrib": {"Wix": "basic", "GA": "full", "TWIPLA": "limited"}
}

# Convert to numerical values for heatmap coloring
score_map = {"full": 3, "partial": 2, "basic": 2, "limited": 1, "none": 0}
symbol_map = {"full": "✓", "partial": "◐", "basic": "◐", "limited": "△", "none": "✗"}

# Create matrices
z_values = []
text_values = []
hover_text = []

for feature in features:
    z_row = []
    text_row = []
    hover_row = []
    
    for platform in ["Wix", "GA", "TWIPLA"]:
        status = matrix_data[feature][platform]
        z_row.append(score_map[status])
        text_row.append(symbol_map[status])
        
        platform_full = {"Wix": "Wix Analytics", "GA": "Google Analytics", "TWIPLA": "TWIPLA"}[platform]
        hover_row.append(f"{platform_full}<br>{feature}: {status.title()}")
    
    z_values.append(z_row)
    text_values.append(text_row)
    hover_text.append(hover_row)

# Create the heatmap
fig = go.Figure(data=go.Heatmap(
    z=z_values,
    x=platforms,
    y=features,
    text=text_values,
    texttemplate="%{text}",
    textfont={"size": 24, "color": "white"},
    hovertemplate='%{hovertext}<extra></extra>',
    hovertext=hover_text,
    colorscale=[
        [0.0, '#DB4545'],    # Red for none
        [0.33, '#D2BA4C'],   # Yellow for limited/basic  
        [0.66, '#2E8B57'],   # Green for partial
        [1.0, '#1FB8CD']     # Cyan for full
    ],
    showscale=False,
    xgap=2,
    ygap=2
))

# Update layout
fig.update_layout(
    title="Analytics Platform Feature Comparison",
    xaxis_title="Platform",
    yaxis_title="Features",
    font=dict(size=12),
    plot_bgcolor='white'
)

# Update axes
fig.update_xaxes(side="bottom", tickangle=0)
fig.update_yaxes(tickmode='linear', tick0=0, dtick=1)

# Save the chart
fig.write_image("analytics_comparison.png", width=800, height=600, scale=2)