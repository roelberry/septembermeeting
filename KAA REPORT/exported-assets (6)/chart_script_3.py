import plotly.graph_objects as go
import plotly.express as px

# Data for Growth Opportunities Matrix with varied positioning within quadrants
opportunities = [
    # High Impact, Low Effort (spread across quadrant)
    {"name": "Reg Forms", "impact": 4.2, "effort": 1.2, "category": "High Impact, Low Effort"},
    {"name": "Testimonials", "impact": 3.8, "effort": 1.5, "category": "High Impact, Low Effort"},
    {"name": "Bazaar Promo", "impact": 4.0, "effort": 1.8, "category": "High Impact, Low Effort"},
    
    # High Impact, High Effort (spread across quadrant)
    {"name": "Member Portal", "impact": 4.3, "effort": 4.1, "category": "High Impact, High Effort"},
    {"name": "Gallery Tours", "impact": 3.9, "effort": 3.7, "category": "High Impact, High Effort"},
    {"name": "Artist Blog", "impact": 4.1, "effort": 3.4, "category": "High Impact, High Effort"},
    
    # Low Impact, Low Effort (spread across quadrant)
    {"name": "Contact Info", "impact": 1.3, "effort": 1.1, "category": "Low Impact, Low Effort"},
    {"name": "Social Links", "impact": 1.6, "effort": 1.4, "category": "Low Impact, Low Effort"},
    {"name": "Alt Text", "impact": 1.2, "effort": 1.7, "category": "Low Impact, Low Effort"}
]

# Create scatter plot
fig = go.Figure()

# Define colors for each category
colors = {
    "High Impact, Low Effort": "#1FB8CD",  # Strong cyan - priority items
    "High Impact, High Effort": "#DB4545",  # Bright red - future projects
    "Low Impact, Low Effort": "#2E8B57"     # Sea green - quick wins
}

# Add quadrant background shading first
fig.add_shape(
    type="rect",
    x0=0.5, y0=2.5, x1=2.5, y1=4.5,
    fillcolor="#1FB8CD",
    opacity=0.15,
    layer="below",
    line_width=0,
)

fig.add_shape(
    type="rect",
    x0=2.5, y0=2.5, x1=4.5, y1=4.5,
    fillcolor="#DB4545",
    opacity=0.15,
    layer="below",
    line_width=0,
)

fig.add_shape(
    type="rect",
    x0=0.5, y0=0.5, x1=2.5, y1=2.5,
    fillcolor="#2E8B57",
    opacity=0.15,
    layer="below",
    line_width=0,
)

# Add scatter points for each category
for category in colors.keys():
    category_data = [item for item in opportunities if item["category"] == category]
    
    fig.add_trace(go.Scatter(
        x=[item["effort"] for item in category_data],
        y=[item["impact"] for item in category_data],
        mode='markers+text',
        text=[item["name"] for item in category_data],
        textposition="middle right",
        marker=dict(
            size=20,
            color=colors[category],
            symbol="circle",
            line=dict(width=2, color="white")
        ),
        name=category.replace(", ", "<br>"),
        hovertemplate="<b>%{text}</b><br>Effort: %{x:.1f}<br>Impact: %{y:.1f}<extra></extra>",
        textfont=dict(size=11, color="black")
    ))

# Add quadrant labels
fig.add_annotation(
    x=1.5, y=4.3,
    text="QUICK WINS",
    showarrow=False,
    font=dict(size=12, color="gray", family="Arial Black"),
    bgcolor="white",
    bordercolor="gray",
    borderwidth=1
)

fig.add_annotation(
    x=3.5, y=4.3,
    text="MAJOR PROJECTS",
    showarrow=False,
    font=dict(size=12, color="gray", family="Arial Black"),
    bgcolor="white",
    bordercolor="gray",
    borderwidth=1
)

fig.add_annotation(
    x=1.5, y=0.7,
    text="FILL-INS",
    showarrow=False,
    font=dict(size=12, color="gray", family="Arial Black"),
    bgcolor="white",
    bordercolor="gray",
    borderwidth=1
)

# Update layout
fig.update_layout(
    title="Digital Growth Strategy Matrix",
    xaxis_title="Effort Required",
    yaxis_title="Impact Potential",
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    showlegend=True
)

# Update axes
fig.update_xaxes(
    range=[0.5, 4.5],
    tickvals=[1, 2, 3, 4],
    ticktext=["Low", "Medium", "High", "Max"]
)

fig.update_yaxes(
    range=[0.5, 4.5],
    tickvals=[1, 2, 3, 4],
    ticktext=["Low", "Medium", "High", "Max"]
)

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("growth_opportunities_matrix.png")