import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

# Sessions Over Time data
sessions_data = {
    "trend_days": ["Aug 11", "Aug 15", "Aug 19", "Aug 23", "Aug 27", "Aug 31", "Sep 4", "Sep 8"],
    "trend_sessions": [8, 15, 20, 12, 18, 10, 20, 19]
}

# Create DataFrame
df = pd.DataFrame(sessions_data)

# Create line chart
fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df['trend_days'],
    y=df['trend_sessions'],
    mode='lines+markers',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(size=8, color='#1FB8CD'),
    name='Sessions',
    hovertemplate='<b>%{x}</b><br>Sessions: %{y}<extra></extra>'
))

# Update layout
fig.update_layout(
    title='Sessions Over Time',
    xaxis_title='Date',
    yaxis_title='Sessions',
    showlegend=False
)

# Update traces
fig.update_traces(cliponaxis=False)

# Update axes
fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(0,0,0,0.1)')
fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(0,0,0,0.1)')

# Save the chart
fig.write_image("sessions_over_time.png")